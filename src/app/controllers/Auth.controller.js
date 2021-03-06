const httpStatus = require('http-status')
const AuthService = require('../services/Auth.service')
const TokenService = require('../services/Token.service')
const UserService = require('../services/User.service')
const { dataResponse } = require('../../utils/response')
const MailService = require('../services/Mail.service')
const { tokenTypes } = require('../../configs/tokens.config')
const moment = require('moment')

class AuthController {
    // POST auth/login
    async login(req, res, next) {
        let { account, password } = req.body
        try {
            const user = await AuthService.getUserByAccountAndPassword(
                account,
                password,
            )
            let tokens = await TokenService.generateAuthTokens(user)
            // res = AuthService.responseSetHeader(res, tokens)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    {
                        user,
                        tokens,
                    },
                    'Login successfully!',
                ),
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
                // res = AuthService.responseSetHeader(res, tokens)
                res.status(httpStatus.OK).json(
                    dataResponse(
                        httpStatus.OK,
                        {
                            user,
                            tokens,
                        },
                        'Login successfully!',
                    ),
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
                    'Create account successfully!',
                ),
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
                true,
            )

            const user = await UserService.getUserByUsername(
                decodedAccessToken.sub,
            )
            const isValidAccessToken =
                TokenService.checkAccessToken(decodedAccessToken)
            const isExpiredRefreshToken =
                TokenService.checkExpireToken(refreshTokenFromBody)
            const isValidRefreshToken = TokenService.checkRefreshToken(
                refreshTokenFromBody,
                user._id,
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
                    'minutes',
                )

                const accessToken = TokenService.generateToken(
                    user.username,
                    accessTokenExpires,
                    tokenTypes.ACCESS,
                )

                res.setHeader('Authorization-access', accessToken)
                res.status(httpStatus.OK).json(
                    dataResponse(
                        httpStatus.OK,
                        accessToken,
                        'Reset access token successfully!',
                    ),
                )
            }
        } catch (error) {
            next(error)
        }
    }

    // POST auth/forgotpassword
    async forgotPassword(req, res, next) {
        try {
            var email = req.body.email
            const user = await MailService.getUserByEmail(email)
            user.password = MailService.randomString()
            await MailService.sendEmail(
                req,
                res,
                email,
                'New password',
                user.password,
            )
            await MailService.updateUserByEmail(email, user)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    true,
                    'I had send a new password to your email. Please check',
                ),
            )
            res.redirect('/login')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
