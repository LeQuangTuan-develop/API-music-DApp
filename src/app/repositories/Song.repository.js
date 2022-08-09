const { Song } = require('../models')
const BaseRepository = require('./Base.repository')
const { Op } = require('sequelize')

class SongRepository extends BaseRepository {
    constructor() {
        super(Song)
    }

    async search(search) {
        const result = await Song.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        musician: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        singer: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            },
        })
        return result
    }
}

module.exports = new SongRepository()
