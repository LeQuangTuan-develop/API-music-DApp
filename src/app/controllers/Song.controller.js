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
    //get Songs
    async index(req, res, next) {
        try {
            const songs = await SongService.getAllSongs()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, songs))
        } catch (error) {
            next(error)
        }
    }

    //get detail
    async getDetail(req,res,next){
        try {
            const id = req.params.id
            const songs = await SongService.getDetail(id)
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, songs))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SongController()
