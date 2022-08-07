const { Genre } = require('../models')
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')
const GenreRepository = require('../repositories/Genre.repository')

class GenreService {
    async getAllGenres(query) {
        const fieldAllow = ['name', 'createdAt']
        const value = GenreRepository.findAndPaginate(
            query.conditions,
            query.orderBy || [],
            query._page,
            query._size,
            fieldAllow,
        )

        return value
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
                'This genre does not exist',
            )

        await Genre.update(
            {
                ...body,
            },
            {
                where: { _id: id },
            },
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
                'This genre does not exist',
            )

        return deleteGenre
    }

    async getDetail(id) {
        const genre = await Genre.findByPk(id)
        if (!genre)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist',
            )
        return genre
    }

    async search(search) {
        const result = await GenreRepository.search(search)
        return result
    }
}

module.exports = new GenreService()
