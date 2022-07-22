const { Genre } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

class GenreRepository {
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
