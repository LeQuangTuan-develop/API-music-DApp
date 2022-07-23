const express = require('express')
const passport = require('passport')

const AuthController = require('../app/controllers/Auth.controller')
const authValidation = require('../app/validations/auth.validation')
const validate = require('../app/middlewares/Validate.middleware')

const router = express.Router()

// POST api/auth/login
router.post(
    '/login',
    validate(authValidation.loginSchema),
    AuthController.login
)

router.post(
    '/login-google',
    validate(authValidation.googleAccountSchema),
    AuthController.handleLoginWithGoogle
)
router.post(
    '/logout',
    validate(authValidation.refreshSchema),
    passport.authenticate('jwt', { session: false }),
    AuthController.logout
)
// POST api/v1/auth/register
router.post(
    '/register',
    validate(authValidation.registerSchema),
    AuthController.register
)

router.post(
    '/refresh',
    validate(authValidation.refreshSchema),
    AuthController.refreshTokens
)

module.exports = router
