const httpStatus = require('http-status')
const ApiError = require('../../utils/apiError')

const validateRole = (req, res, next) => {
    try {
        if (req.user.role !== 'ADMIN') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Role')
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = validateRole
