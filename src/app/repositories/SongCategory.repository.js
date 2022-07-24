const { SongCategory } = require('../models')
const Sequelize = require('sequelize')
const BaseRepository = require('./Base.repository')

class SongCategoryRepository extends BaseRepository {
    constructor() {
        super(SongCategory)
    }

    async search(search) {
        const result = await SongCategory.findAll({
            where: Sequelize.literal(
                'MATCH(name) AGAINST(:name WITH QUERY EXPANSION)',
            ),
            replacements: {
                name: search,
            },
        })
        console.log(result)
        return result
    }
}

module.exports = new SongCategoryRepository()
