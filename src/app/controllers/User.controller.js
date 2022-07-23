const httpStatus = require('http-status')
const UserService = require('../services/User.service')
const { dataResponse } = require('../../utils/response')
const { UserDto, UserDtos } = require('../dtos/user.dto')

class UserController {
    // GET users
    async index(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, new UserDtos(users)),
            )
        } catch (error) {
            next(error)
        }
    }

    // GET users/:id
    async show(req, res, next) {
        try {
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, new UserDto(req.user)),
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
                    new UserDto(saveUser),
                    'Create new user successfully',
                ),
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
                    new UserDto(updateUser),
                    'Update info user successfully',
                ),
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
                    new UserDto(deleteUser),
                    'Delete user successfully',
                ),
            )
        } catch (error) {
            next(error)
        }
    }

    async test(req, res, next) {
        try {
            const users = await UserService.test()
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    new UserDtos(users),
                    'Get all user successfully',
                ),
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()
