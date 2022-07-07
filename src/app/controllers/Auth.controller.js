const httpStatus = require('http-status')
const UserService = require('../services/User.Service')
const TokenService = require('../services/Token.Service')
const { errorResponse, dataResponse } = require('../../utils/response')

class AuthController {
    // POST auth/login
    async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await UserService.getUserByEmailAndPassword(
                email,
                password
            )
            const tokens = await TokenService.generateAuthTokens(user)
            res.setHeader('Authorization-access', tokens.access.token)
            res.setHeader('Authorization-access-expires', tokens.access.expires)
            res.setHeader('Authorization-refresh', tokens.refresh.token)
            res.setHeader(
                'Authorization-refresh-expires',
                tokens.refresh.expires
            )
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, user))
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }
}

module.exports = new AuthController()
