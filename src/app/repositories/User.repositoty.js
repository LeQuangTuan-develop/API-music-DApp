const { User, Song, Token } = require('../models')

class UserRepository {
    async test() {
        const users = await User.findAll({
            where: {
                gender: true,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            include: [
                {
                    model: Song,
                    as: 'songData',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
                    },
                    // where: {
                    //     id: 2,
                    // },
                },
                {
                    model: Token,
                    as: 'tokenData',
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
