const UserService = require('../services/User.service')

class UserController {
    // GET users
    async index(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // Get users/:id
    async show(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // POST users
    async create(req, res) {
        try {
            const saveUser = await UserService.createUser(req.body)
            res.status(200).json(saveUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new UserController()
