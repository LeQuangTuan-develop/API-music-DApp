const { User } = require('../models')
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const TokenService = require('./Token.service')

class AuthService {
    async getUserByEmailAndPassword(email, password) {
        const user = await User.findOne({ email })
        if (!user || !(await user.isPasswordMatch(password))) {
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
}

module.exports = new AuthService()
