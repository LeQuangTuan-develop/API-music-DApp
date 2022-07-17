const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const ApiError = require('../../utils/ApiError.util')
const { checkValidObjectId } = require('../../utils/Helper.util')
class UserService {
    async getAllUsers() {
        console.log('run here')
        return await User.findAll()
    }

    async createUser(data) {
        if (await User.findOne({ where: { email: data.email } })) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
        }
        const newUser = new User(data)
        newUser.password = await bcrypt.hash(newUser.password, 10)
        const saveUser = await newUser.save()

        return saveUser
    }

    async getUserById(id) {
        const user = await User.findByPk(id)
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
}

module.exports = new UserService()
