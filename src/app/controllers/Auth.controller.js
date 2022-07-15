const httpStatus = require('http-status')
const AuthService = require('../services/Auth.Service')
const TokenService = require('../services/Token.Service')
const UserService = require('../services/User.Service')
const { dataResponse } = require('../../utils/response')
const { tokenTypes } = require('../../configs/tokens')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class AuthController {
    // POST auth/login
    async login(req, res, next) {
        let { account, password } = req.body
        try {
            const user = await AuthService.getUserByAccountAndPassword(
                account,
                password
            )
            let tokens = await TokenService.generateAuthTokens(user)
            res = AuthService.responseSetHeader(res, tokens)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, null, 'Login successfully!')
            )
        } catch (error) {
            next(error)
        }
    }

    async handleLoginWithGoogle(req, res, next) {
        try {
            let { googleId, avatar } = req.body
            req.body.avatarUrl = avatar
            req.body.username = googleId

            const user = await UserService.handleLoginWithGoogle(req.body)
            if (user) {
                let tokens = await TokenService.generateAuthTokens(user)
                res = AuthService.responseSetHeader(res, tokens)
                res.status(httpStatus.OK).json(
                    dataResponse(httpStatus.OK, user, 'Login successfully!')
                )
            }
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
            if (user) {
                await TokenService.saveToken(null, user._id, tokenTypes.REFRESH)
            }
            res.status(httpStatus.CREATED).json(
                dataResponse(
                    httpStatus.CREATED,
                    user,
                    'Create account successfully!'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    // POST auth/refresh
    async refreshTokens(req, res, next) {
        try {
            // define variable
            const accessTokenFromHeader =
                req.headers.authorization.split(' ')[1]
            const refreshTokenFromBody = req.body.refreshToken

            const decodedAccessToken = TokenService.decodeToken(
                accessTokenFromHeader,
                true
            )

            const user = await UserService.getUserByUsername(
                decodedAccessToken.sub
            )
            const isValidAccessToken =
                TokenService.checkAccessToken(decodedAccessToken)
            const isExpiredRefreshToken =
                TokenService.checkExpireToken(refreshTokenFromBody)
            const isValidRefreshToken = TokenService.checkRefreshToken(
                refreshTokenFromBody,
                user._id
            )

            // end define variable
                
            if (
                isValidAccessToken &&
                !isExpiredRefreshToken &&
                isValidRefreshToken
            ) {
                // do refresh token
                const accessTokenExpires = moment().add(
                    process.env.PASSPORT_JWT_ACCESS_EXPIRED / 60,
                    'minutes'
                )

                const accessToken = TokenService.generateToken(
                    user.username,
                    accessTokenExpires,
                    tokenTypes.ACCESS
                )

                res.setHeader('Authorization-access', accessToken)
                res.status(httpStatus.OK).json(
                    dataResponse(
                        httpStatus.OK,
                        accessToken,
                        'Reset access token successfully!'
                    )
                )
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
