const httpStatus = require('http-status')
const userService = require('../services/User.Service')

class AuthController {
    // POST auth/login
    async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await userService.getUserByEmailAndPassword(
                email,
                password
            )
            res.status(httpStatus.OK).json(user)
        } catch (error) {
            res.status(error.statusCode).json({
                code: error.statusCode,
                error: error.message,
            })
        }
    }
}

module.exports = new AuthController()
