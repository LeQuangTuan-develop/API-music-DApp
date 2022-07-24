const httpStatus = require('http-status')
const ApiError = require('../../utils/apiError')
const { userRole } = require('../../configs/userRole.config')

const validateRole = (req, res, next) => {
    try {
        if (req.user.role !== userRole.ADMIN) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Role')
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = validateRole
