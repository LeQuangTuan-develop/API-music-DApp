const { Playlist } = require('../models')
const { sequelize } = require('../models')
const { QueryTypes } = require('sequelize');

class PlayListRepository {

    async random(limit) {
        const playlist =  await sequelize.query(
            'SELECT * FROM playlists ORDER BY RAND() LIMIT ' + limit,
            {
              type: QueryTypes.SELECT
            }
          );
        // const playlist = await Playlist.findAll({
            
        //     limit: 10,
        //     offset: 2 * 10,
        // })

        return playlist
    }

}

module.exports = new PlayListRepository()
