const {PlayList } = require('../model')

class PlayListRepository {
    async findlistNew() {
        const lists = await PlayList.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            order: [['createdAt', 'desc']],

        })

        return lists
    }
}

module.exports = new PlayListRepository()
