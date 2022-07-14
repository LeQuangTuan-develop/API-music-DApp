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

module.exports = {
    loginSchema,
    refreshSchema,
    registerSchema,
}
