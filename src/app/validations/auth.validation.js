const Joi = require('joi')

const { password } = require('./customize.validation')

const loginSchema = {
    body: Joi.object().keys({
        account: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const refreshSchema = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

const registerSchema = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().custom(password),
        email: Joi.string().required().email(),
    }),
}

const forgotPasswordSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
}
const googleAccountSchema = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        googleId: Joi.string().required(),
        avatar: Joi.string().required(),
    }),
}

module.exports = {
    loginSchema,
    refreshSchema,
    registerSchema,
    forgotPasswordSchema,
    googleAccountSchema,
}
