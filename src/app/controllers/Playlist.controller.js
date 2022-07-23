const httpStatus = require('http-status')
const { dataResponse } = require('../../utils/response')
const playlist = require('../services/Playlist.service')

class PlaylistController {
    // Get auth/random playlists
    async randomPlaylist(req, res, next) {
        try {
            // console.log('aaaa')//
            // 2 là số object muốn lấy
            const randomList = await playlist.getRandomPlaylist(2)

            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, randomList, 'success'),
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PlaylistController()
