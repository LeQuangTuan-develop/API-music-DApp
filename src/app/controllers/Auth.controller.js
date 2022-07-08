const httpStatus = require('http-status')
const AuthService = require('../services/Auth.Service')
const TokenService = require('../services/Token.Service')
const UserService = require('../services/User.Service')
const { errorResponse, dataResponse } = require('../../utils/response')

class AuthController {
    // POST auth/login
    async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await AuthService.getUserByEmailAndPassword(
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

    // POST auth/logout
    async logout(req, res) {
        try {
            await AuthService.logout(req.body.refreshToken)
            res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    // POST auth/register
    async register(req, res) {
        try {
            const user = await UserService.createUser(req.body)
            const tokens = await TokenService.generateAuthTokens(user)
            res.setHeader('Authorization-access', tokens.access.token)
            res.setHeader('Authorization-access-expires', tokens.access.expires)
            res.setHeader('Authorization-refresh', tokens.refresh.token)
            res.setHeader(
                'Authorization-refresh-expires',
                tokens.refresh.expires
            )
            res.status(httpStatus.CREATED).json(
                dataResponse(httpStatus.CREATED, user)
            )
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    async refreshTokens(req, res) {
        try {
            await AuthService.logout(req.body.refreshToken)
            const tokens = await TokenService.generateAuthTokens(req.user)
            res.setHeader('Authorization-access', tokens.access.token)
            res.setHeader('Authorization-access-expires', tokens.access.expires)
            res.setHeader('Authorization-refresh', tokens.refresh.token)
            res.setHeader(
                'Authorization-refresh-expires',
                tokens.refresh.expires
            )
            res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }
}

module.exports = new AuthController()
