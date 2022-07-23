const httpStatus = require('http-status')
const { dataResponse } = require('../../utils/response')
const SongService = require('../services/Song.service')

class SongController {
    async create(req, res, next) {
        try {
            const createSong = await SongService.createSong(req.body)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, createSong, 'Create song successfully!')
            )
        } catch (error) {
            next(error)
        }
    }

    async searchSong(req, res, next) {
        try {
            const hits = await SongService.searchSong(req.query.q)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, hits, 'Search successfully!')
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SongController()
