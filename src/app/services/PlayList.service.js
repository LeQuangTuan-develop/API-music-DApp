const httpStatus = require('http-status')
const { PlayList } = require('../models')
const playListRepository = require('../repositories/PlayList.repositoty')
class ListSongService{
    async getListNewSong() {
        return await  playListRepository.findlistNew()   
    }

    
}
module.exports = new ListSongService()