const {Playlist } = require('../models')

class PlayListRepository {
    async findlistNew() {
        console.log('run')
        const lists = await Playlist.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            order: [['createdAt', 'desc']],

        })

        return lists
    }
}

module.exports = new PlayListRepository()
