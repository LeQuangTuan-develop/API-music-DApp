class UserDto {
    constructor(user) {
        Object.keys(user).forEach((key) => {
            this[key] = user[key]
        })
        this.id = user._id
        this._id && delete this._id
        this.password && delete this.password
        this.updatedAt && delete this.updatedAt
    }
}

class UserDtos {
    constructor(users) {
        this.users = []
        users.forEach((user) => {
            this.users.push(new UserDto(user))
        })

        return this.users
    }
}

module.exports = {
    UserDto,
    UserDtos,
}
