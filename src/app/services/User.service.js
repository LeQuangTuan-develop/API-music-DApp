const httpStatus = require('http-status')
const { User } = require('../models')
const ApiError = require('../../utils/apiError')
const { checkValidObjectId } = require('../../utils/helper')
class UserService {
    async getAllUsers() {
        return await User.find()
    }

    async createUser(data) {
        if (await User.isEmailTaken(data.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
        }
        const newUser = new User(data)
        const saveUser = await newUser.save()

        return saveUser
    }

    async getUserById(id) {
        if (!checkValidObjectId(id)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID user')
        }
        const user = await User.findById(id)
        if (!user)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        return user
    }

    async updateUser(id, body) {
        if (!checkValidObjectId(id)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID user')
        }
        const user = await User.findById(id)
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
        if (!checkValidObjectId(id)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID user')
        }
        const deleteUser = await User.findOneAndRemove({ _id: id })
        if (!deleteUser)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This user does not exist'
            )

        return deleteUser
    }

    async getUserByEmailAndPassword(email, password) {
        const user = await User.findOne({ email })
        if (!user || !(await user.isPasswordMatch(password))) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                'Incorrect email or password'
            )
        }
        return user
    }
}

module.exports = new UserService()
