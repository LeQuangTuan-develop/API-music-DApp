const jwt = require('jsonwebtoken')
const moment = require('moment')

const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const { Token } = require('../models')
const { tokenTypes } = require('../../configs/tokens')
const { Op } = require('sequelize')
class TokenService {
    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(
            process.env.PASSPORT_JWT_ACCESS_EXPIRED / 60,
            'minutes'
        )
        const accessToken = this.generateToken(
            user.username,
            accessTokenExpires,
            tokenTypes.ACCESS
        )

        const refreshTokenExpires = moment().add(
            process.env.PASSPORT_JWT_REFRESH_EXPIRED / 60,
            'minutes'
        )
        let refreshToken = this.generateToken(
            user.username,
            refreshTokenExpires,
            tokenTypes.REFRESH
        )   

        let currentToken = await this.getRefreshTokenByUserId(user._id);
        if (!(currentToken)) {
            await this.updateRefreshTokenByUserId(user._id, refreshToken)
        } else {
            refreshToken = currentToken
        }

        return { accessToken, refreshToken }
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
            { token: refreshToken },
            {
                where: {
                    [Op.and]: [
                        { userId: userId },
                        { type: tokenTypes.REFRESH },
                    ],
                },
            }
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
                [Op.and]: [{ userId: userId}, {type: tokenTypes.REFRESH }],
            },
        })
        return refreshTokenDoc.token
    }

    // decode token expired to create new access token
    async decodeToken(token, secretKey = process.env.PASSPORT_JWT) {
        try {
            return jwt.verify(token, secretKey, {
                ignoreExpiration: true,
            })
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()
