const { Genre } = require('../models')
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const { Op } = require('sequelize')
const { post } = require('../../routes/genre')

class GenreService {
    async getAllGenres() {
        console.log('run here')
        return await Genre.findAll()
    }

    async createGenre(data) {
        const genre = await Genre.findOne({ where: { name: data.name } })
        if (genre) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'This genre is exist')
        }

        const newGenre = new Genre(data)
        const saveGenre = await newGenre.save()

        return saveGenre
    }

    async updateGenre(id, body) {
        const genre = await Genre.findByPk(id)

        if (!genre)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist'
            )

        const genre1 = await Genre.findAll({
            where: {
                [Op.and]: [
                    {
                        name: body.name,
                    },
                    {
                        _id: {
                            [Op.ne]: id,
                        },
                    },
                ],
            },
        })

        console.log(genre1)

        if (genre1.length > 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'This genre is exist')
        }

        await Genre.update(
            {
                ...body,
            },
            {
                where: { _id: id },
            }
        )
        return body
    }

    async deleteGenre(id) {
        const deleteGenre = await Genre.destroy({
            where: {
                _id: id,
            },
        })
        if (!deleteGenre)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist'
            )

        return deleteGenre
    }

    async getDetail(id) {
        const genre = await Genre.findByPk(id)
        if (!genre)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist'
            )
        return genre
    }
}

module.exports = new GenreService()
