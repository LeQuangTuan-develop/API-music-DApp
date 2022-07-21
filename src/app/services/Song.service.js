const { Song } = require('../models')

class SongService {
    async createSong(data) {
        data.lyricRendered = JSON.stringify(data.lyricRendered)

        const newSong = new Song(data)
        const createSong = await newSong.save()

        return createSong
    }
}

module.exports = new SongService()
