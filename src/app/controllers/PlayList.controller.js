const httpStatus = require('http-status')
const { dataResponse } = require('../../utils/response')
const PlayListService = require('../services/PlayList.service')

class PlayListController{
    async show(req, res, next) {
        try {
            const cates = await PlayListService.getListNewSong()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, cates))
        } catch (error) {
            next(error)
        }
    }
}