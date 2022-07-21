const httpStatus = require('http-status')
const { dataResponse } = require('../../utils/response')
const SongService = require('../services/Song.service')

class SongController {
    async create(req, res, next) {
        try {
            const createSong = await SongService.createSong(req.body)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, createSong, 'Login successfully!')
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SongController()
