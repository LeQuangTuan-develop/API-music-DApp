const express = require('express')
const passport = require('passport')

const AuthController = require('../app/controllers/Auth.controller')
const authValidation = require('../app/validations/auth.validation')
const validate = require('../app/middlewares/validate')

const router = express.Router()

router.post(
    '/login',
    validate(authValidation.loginSchema),
    AuthController.login
)
router.post(
    '/logout',
    validate(authValidation.refreshSchema),
    passport.authenticate('jwt', { session: false }),
    AuthController.logout
)
router.post(
    '/register',
    validate(authValidation.registerSchema),
    AuthController.register
)
router.post(
    '/refresh',
    validate(authValidation.refreshSchema),
    passport.authenticate('jwt', { session: false }),
    AuthController.refreshTokens
)

module.exports = router
