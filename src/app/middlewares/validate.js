const Joi = require('joi')
const httpStatus = require('http-status')

const pickKeys = require('../../utils/pickKeys')
const ApiError = require('../../utils/apiError')

module.exports = (schema) => (req, res, next) => {
    try {
        const validSchema = pickKeys(schema, ['params', 'query', 'body'])
        const object = pickKeys(req, Object.keys(validSchema))
        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' }, abortEarly: false })
            .validate(object)

        if (error) {
            const errorMessage = error.details.map((details) => details.message)
            throw new ApiError(httpStatus.BAD_REQUEST, errorMessage)
        }
        Object.assign(req, value)
        return next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}
