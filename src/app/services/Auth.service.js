const { User } = require('../models')
const bcrypt = require('bcryptjs')
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const TokenService = require('./Token.service')
const { Op } = require('sequelize')
const TokenRepository = require('../repositories/Token.repository')

class AuthService {
    async getUserByAccountAndPassword(account, password) {
        let user = await User.findOne({
            where: { [Op.or]: [{ username: account }, { email: account }] },
        })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Your email or password is incorrect'
            )
        }
        return user
    }

    async logout(refreshToken) {
        const refreshTokenDoc = await TokenService.getTokenByRefresh(
            refreshToken
        )
        if (!refreshTokenDoc) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Refresh Token')
        }
        const logoutToken = await TokenRepository.logout(refreshToken)
        return logoutToken
    }

    responseSetHeader(res, tokens) {
        res.setHeader('Authorization-access', tokens.accessToken)
        res.setHeader('Authorization-refresh', tokens.refreshToken)
        return res
    }
}

module.exports = new AuthService()
