const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const { tokenTypes } = require('../../configs/tokens')
const TokenService = require('../services/Token.Service')
const { User } = require('../models')
const ApiError = require('../../utils/apiError')
const AuthService = require('../services/Auth.Service')
const userRepository = require('../repositories/user.repositoty')
const { Op } = require('sequelize')
class UserService {
    async getAllUsers() {
        console.log('run here')
        return await User.findAll()
    }

    async handleLoginWithGoogle(data){
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: data.username }, { email: data.email }],
            },
        })
        if (!user) {
            data.password = await bcrypt.hash(data.username, 10)
            const user = await new User(data).save();
            const doSave = await TokenService.saveToken(null, user._id, tokenTypes.REFRESH)
            return user
        }else{
            return await AuthService.getUserByAccountAndPassword(
                data.username,
                data.username
            )
        }

    }

    async createUser(data) {
        let user = await User.findOne({
            where: {
                [Op.or]: [{ username: data.username }, { email: data.email }],
            },
        })
        if (!user) {
            data.password = await bcrypt.hash(data.password, 10)
            return await new User(data).save()
        } else if (user && user.username == data.username) {
            throw new ApiError(
                httpStatus.CONFLICT,
                'Your username already exists! Please choose another username...'
            )
        } else {
            throw new ApiError(
                httpStatus.CONFLICT,
                'Your email has been used ! Please choose another email...'
            )
        }
    }

    async getUserByUsername(username) {
        const user = await User.findOne({
            where: { username: username },
        })
        if (!user)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )
        return user
    }

    async updateUser(id, body) {
        const user = await User.findByPk(id)
        if (!user)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        Object.keys(body).forEach((key) => {
            console.log(body[key])
            user[key] = body[key]
        })
        await user.save()
        return user
    }

    async deleteUser(id) {
        const deleteUser = await User.destroy({
            where: {
                id: id,
            },
        })
        if (!deleteUser)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        return deleteUser
    }

    async test() {
        const users = await userRepository.test()
        return users
    }
}

module.exports = new UserService()
