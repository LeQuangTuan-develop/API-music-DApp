const User = require('../models/User')

class UserService {
    async getAllUsers() {
        return await User.find()
        // use uer.find().lean() If you're executing a query and sending the results without modification to
    }

    async createUser(data) {
        const newUser = await new User(data)
        const saveUser = await newUser.save()

        return saveUser
    }

    async getUserById(id) {
        const user = await User.findById(id)
        return user
    }
}

module.exports = new UserService()
