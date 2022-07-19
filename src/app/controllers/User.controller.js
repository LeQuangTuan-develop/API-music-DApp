const httpStatus = require('http-status')
const UserService = require('../services/User.service')
const { dataResponse } = require('../../utils/response')

class UserController {
    // GET users
    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, users))
        } catch (error) {
            next(error)
        }
    }

    // GET users/:id
    async getUser(req, res, next) {
        try {
            // const user = await UserService.getUserById(req.params.id)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, req.user)
            )
        } catch (error) {
            next(error)
        }
    }

    // POST users/:id
    async create(req, res, next) {
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
            next(error)
        }
    }

    // PUT users/:id
    async update(req, res, next) {
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
            next(error)
        }
    }

    // DELETE users/:id
    async delete(req, res, next) {
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
            next(error)
        }
    }

    async test(req, res, next) {
        try {
            const users = await UserService.test()
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, users, 'Get all user successfully')
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
