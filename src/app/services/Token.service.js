const jwt = require('jsonwebtoken')
const moment = require('moment')

const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const { Token } = require('../models')
const { tokenTypes } = require('../../configs/tokens.config')
const { Op } = require('sequelize')
class TokenService {
    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(
            process.env.PASSPORT_JWT_ACCESS_EXPIRED / 60,
            'minutes',
        )
        const accessToken = this.generateToken(
            user.username,
            accessTokenExpires,
            tokenTypes.ACCESS,
        )

        const refreshTokenExpires = moment().add(
            process.env.PASSPORT_JWT_REFRESH_EXPIRED / 60,
            'minutes',
        )
        let refreshToken = this.generateToken(
            user.username,
            refreshTokenExpires,
            tokenTypes.REFRESH,
        )
        const currentToken = await this.getRefreshTokenByUserId(user._id)
        if (currentToken == null || this.checkExpireToken(currentToken)) {
            await this.updateRefreshTokenByUserId(user._id, refreshToken)
        } else {
            refreshToken = currentToken
        }

        return {
            accessToken,
            refreshToken,
        }
    }

    generateToken(userId, expires, type, secret = process.env.PASSPORT_JWT) {
        const payload = {
            sub: userId,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        }
        return jwt.sign(payload, secret)
    }

    async updateRefreshTokenByUserId(userId, refreshToken) {
        return await Token.update(
            {
                token: refreshToken,
            },
            {
                where: {
                    [Op.and]: [
                        {
                            userId: userId,
                        },
                        {
                            type: tokenTypes.REFRESH,
                        },
                    ],
                },
            },
        )
    }

    async saveToken(token, userId, type, blackListed = false) {
        const tokenDoc = await Token.create({
            token,
            userId: userId,
            type,
            blackListed,
        })
        return tokenDoc
    }

    async getRefreshTokenByUserId(userId) {
        const refreshTokenDoc = await Token.findOne({
            where: {
                [Op.and]: [
                    {
                        userId: userId,
                    },
                    {
                        type: tokenTypes.REFRESH,
                    },
                ],
            },
        })
        return refreshTokenDoc.token
    }

    async getTokenByRefresh(refreshToken) {
        const refreshTokenDoc = await Token.findOne({
            where: {
                token: refreshToken,
            },
        })
        return refreshTokenDoc
    }

    // decode token expired to create new access token
    decodeToken(token, ignoreDate, secretKey = process.env.PASSPORT_JWT) {
        try {
            return jwt.verify(token, secretKey, {
                ignoreExpiration: ignoreDate,
            })
        } catch (error) {
            return null
        }
    }

    checkAccessToken(decodedAccessToken) {
        if (
            !decodedAccessToken ||
            decodedAccessToken.type !== tokenTypes.ACCESS
        ) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                ' Access Token invalid!',
            )
        }
        return true
    }

    async checkRefreshToken(refreshToken, userId) {
        const decodedRefreshToken = this.decodeToken(refreshToken, false)
        if (
            refreshToken !==
            ((await this.getRefreshTokenByUserId(userId)) ||
                decodedRefreshToken.type !== tokenTypes.REFRESH)
        ) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Refresh Token invalid!',
            )
        }
        return true
    }

    checkExpireToken(token, secretKey = process.env.PASSPORT_JWT) {
        const { exp } = jwt.decode(token, secretKey)
        if (Date.now() >= exp * 1000) {
            return true
        }
        return false
    }
}

module.exports = new TokenService()
