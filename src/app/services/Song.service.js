const { Song } = require('../models')
const elasticClient = require('../../configs/elastic-client')

class SongService {
    async createSong(data) {
        data.lyricRendered = JSON.stringify(data.lyricRendered)

        const newSong = new Song(data)
        const createSong = await newSong.save()

        await elasticClient.index({
            index: 'song',
            document: {
                ...createSong,
            },
        })

        return createSong
    }
}

module.exports = new SongService()
