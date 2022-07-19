const httpStatus = require('http-status')
const { PlayList } = require('../models')
const playListRepository = require('../repositories/PlayList.repositoty')
class ListSongController{
    async getListNewSong() {
        return await  playListRepository.findlistNew;    
    }

    
}