const { Genre } = require('../models')
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status')

class GenreService{
    async getAllGenres() {
        console.log('run here')
        return await Genre.findAll();
    }

    async createGenre(data) {
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

        Object.keys(body).forEach((key) => {
            console.log(body[key])
            genre[key] = body[key]
        })
        await genre.save()
        return genre
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
}

module.exports = new GenreService()