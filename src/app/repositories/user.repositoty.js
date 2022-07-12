const { User, Song, Token } = require('../model')

class UserRepository {
    async findUserById() {
        const users = await User.findAll({
            where: {
                isActive: true,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            include: [
                {
                    model: Song,
                    as: 'songs',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
                    },
                    // where: {
                    //     id: 2,
                    // },
                },
                {
                    model: Token,
                    as: 'tokens',
                },
            ],
            order: [['username', 'asc']],
            limit: 10,
            offset: 2 * 10,
        })

        return users
    }
}

module.exports = new UserRepository()
