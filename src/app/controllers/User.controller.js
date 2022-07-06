const httpStatus = require('http-status')
const UserService = require('../services/User.service')
const { errorResponse, dataResponse } = require('../../utils/response')

class UserController {
    // GET users
    async index(req, res) {
        try {
            const users = await UserService.getAllUsers()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, users))
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    // GET users/:id
    async show(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id)
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, user))
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    // POST users/:id
    async create(req, res) {
        try {
            const saveUser = await UserService.createUser(req.body)
            res.status(httpStatus.CREATED).json(
                dataResponse(
                    httpStatus.OK,
                    saveUser,
                    'Create new user successfully'
                )
            )
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    // PUT users/:id
    async update(req, res) {
        try {
            const id = req.params.id
            const updateUser = await UserService.updateUser(id, req.body)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    updateUser,
                    'Update info user successfully'
                )
            )
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }

    // DELETE users/:id
    async delete(req, res) {
        try {
            const id = req.params.id
            const deleteUser = await UserService.deleteUser(id)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    deleteUser,
                    'Delete user successfully'
                )
            )
        } catch (error) {
            res.status(error.statusCode).json(
                errorResponse(error.statusCode, error.message)
            )
        }
    }
}

module.exports = new UserController()
