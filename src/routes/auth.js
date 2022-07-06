const express = require('express')

const authController = require('../app/controllers/Auth.controller')
const authValidation = require('../app/validations/auth.validation')

const validate = require('../app/middlewares/validate')

const router = express.Router()

router.post(
    '/login',
    validate(authValidation.loginSchema),
    authController.login
)
// router.post(
//     '/logout',
//     validate(authValidation.logoutSchema),
//     authController.logout
// )
// router.post(
//     '/register',
//     validate(authValidation.registerSchema),
//     authController.register
// )

module.exports = router
