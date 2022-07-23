const httpStatus = require('http-status')
const GenreService = require('../services/Genre.service')
const { dataResponse } = require('../../utils/Response.util')
class GenreController {
    // GET Genres
    async index(req, res, next) {
        try {
            const genres = await GenreService.getAllGenres()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, genres))
        } catch (error) {
            next(error)
        }
    }

     // POST genres/:id
     async create(req, res, next) {
        try {
            const saveGenre = await GenreService.createGenre(req.body)
            res.status(httpStatus.CREATED).json(
                dataResponse(
                    httpStatus.OK,
                    saveGenre,
                    'Create new genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

     // PUT genres/:id
     async update(req, res, next) {
        try {
            const id = req.params.id
            const updateGenre = await GenreService.updateGenre(id, req.body)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    updateGenre,
                    'Update info genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

     // DELETE genres/:id
     async delete(req, res, next) {
        try {
            const id = req.params.id
            const deleteGenre = await GenreService.deleteGenre(id)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    deleteGenre,
                    'Delete genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new GenreController();