const { User } = require('../models')
const bcrypt = require('bcryptjs')
const ApiError = require('../../utils/ApiError.util')
const httpStatus = require('http-status')
const TokenService = require('./Token.service')

class AuthService {
    async getUserByEmailAndPassword(email, password) {
        const user = await User.findOne({ where: { email: email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Incorrect email or password'
            )
        }
        return user
    }

    async logout(refreshToken) {
        const refreshTokenDoc = await TokenService.getTokenByRefresh(
            refreshToken
        )
        await refreshTokenDoc.remove()
        return true
    }

    responseSetHeader(res, tokens) {
        res.setHeader('Authorization-access', tokens.access.token)
        res.setHeader('Authorization-access-expires', tokens.access.expires)
        res.setHeader('Authorization-refresh', tokens.refresh.token)
        res.setHeader('Authorization-refresh-expires', tokens.refresh.expires)
        return res
    }
}

module.exports = new AuthService()
