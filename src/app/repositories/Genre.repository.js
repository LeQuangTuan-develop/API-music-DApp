const { Genre } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')
const BaseRepository = require('./Base.repository')

class GenreRepository extends BaseRepository {
    constructor() {
        super(Genre)
    }

    async search(search) {
        const result = await Genre.findAll({
            where: Sequelize.literal('MATCH(name,description) AGAINST(:name)'),
            replacements: {
                name: search,
            },
        })
        return result
    }
}

module.exports = new GenreRepository()
