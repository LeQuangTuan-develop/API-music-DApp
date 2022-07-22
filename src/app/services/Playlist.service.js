
const httpStatus = require('http-status')
const {Playlist} = require('../models')
const plist = require('../repositories/playlist.repositoty')
const ApiError = require('../../utils/apiError')

class PlayList{

    async getRandomPlaylist(limit){
        const playlists = await plist.random(limit)
        if (!playlists)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Error'
            )
        return playlists
    }

}
module.exports = new PlayList()