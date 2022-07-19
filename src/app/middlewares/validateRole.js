const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const httpStatus = require('http-status')
const ApiError = require('../../utils/apiError')

const validateRole = (req,resp,next) => {
    try {
        if(req.user.role !='ADMIN'){
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Incorrect Role')
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports= validateRole