const httpStatus = require('http-status')
const AuthService = require('../services/Auth.Service')
const TokenService = require('../services/Token.Service')
const UserService = require('../services/User.Service')
const { dataResponse } = require('../../utils/response')

class AuthController {
    // POST auth/login
    async login(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await AuthService.getUserByEmailAndPassword(
                email,
                password
            )
            const tokens = await TokenService.generateAuthTokens(user)
            console.log(tokens)
            res = AuthService.responseSetHeader(res, tokens)
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, user))
        } catch (error) {
            next(error)
        }
    }

    // POST auth/logout
    async logout(req, res, next) {
        try {
            await AuthService.logout(req.body.refreshToken)
            res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            next(error)
        }
    }

    // POST auth/register
    async register(req, res, next) {
        try {
            const user = await UserService.createUser(req.body)
            // const tokens = await TokenService.generateAuthTokens(user)
            // res = AuthService.responseSetHeader(res, tokens)
            res.status(httpStatus.CREATED).json(
                dataResponse(httpStatus.CREATED, user)
            )
        } catch (error) {
            next(error)
        }
    }

    // POST auth/refresh
    async refreshTokens(req, res, next) {
        try {
            await AuthService.logout(req.body.refreshToken)
            const tokens = await TokenService.generateAuthTokens(req.user)
            res = AuthService.responseSetHeader(res, tokens)
            res.status(httpStatus.NO_CONTENT).send()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
