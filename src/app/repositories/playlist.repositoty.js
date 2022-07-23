const { Playlist } = require('../models')
const { sequelize } = require('../models')
const { QueryTypes } = require('sequelize')

class PlayListRepository {
    async random(limit) {
        const playlist = await sequelize.query(
            'SELECT * FROM playlists ORDER BY RAND() LIMIT ' + limit,
            {
                type: QueryTypes.SELECT,
            },
        )
        return playlist
    }
}

module.exports = new PlayListRepository()
