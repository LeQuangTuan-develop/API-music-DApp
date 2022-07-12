const jwt = require('jsonwebtoken')
const moment = require('moment')

const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const { Token } = require('../models')
const { tokenTypes } = require('../../configs/tokens')
class TokenService {
    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(
            process.env.PASSPORT_JWT_ACCESS_EXPIRED / 60,
            'minutes'
        )
        const accessToken = this.generateToken(
            user._id,
            accessTokenExpires,
            tokenTypes.ACCESS
        )

        const refreshTokenExpires = moment().add(
            process.env.PASSPORT_JWT_REFRESH_EXPIRED / 60,
            'minutes'
        )
        const refreshToken = this.generateToken(
            user._id,
            refreshTokenExpires,
            tokenTypes.REFRESH
        )
        await this.saveToken(
            refreshToken,
            user._id,
            refreshTokenExpires,
            tokenTypes.REFRESH
        )

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
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

    async saveToken(token, userId, expires, type, blacklisted = false) {
        const tokenDoc = await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        })
        return tokenDoc
    }

    async getTokenByRefresh(refreshToken) {
        const refreshTokenDoc = await Token.findOne({
            token: refreshToken,
            type: tokenTypes.REFRESH,
        })
        if (!refreshTokenDoc) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Forbidden')
        }
        return refreshTokenDoc
    }
}

module.exports = new TokenService()
