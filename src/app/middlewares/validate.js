const Joi = require('joi')
const httpStatus = require('http-status')

const pickKeys = require('../../utils/pickKeys')
const { errorResponse } = require('../../utils/response')

module.exports = (schema) => (req, res, next) => {
    const validSchema = pickKeys(schema, ['params', 'query', 'body'])
    const object = pickKeys(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object)

    if (error) {
        const errorMessage = error.details.map((details) => details.message)
        return res
            .status(httpStatus.BAD_REQUEST)
            .json(errorResponse(httpStatus.BAD_REQUEST, errorMessage))
    }
    Object.assign(req, value)
    return next()
}
