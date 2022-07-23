const { Song } = require('../models')
const elasticClient = require('../../configs/elastic-client')

class SongService {
    async createSong(data) {
        data.lyricRendered = JSON.stringify(data.lyricRendered)
        const newSong = new Song(data)
        const createSong = await newSong.save()

        const saveToElasticSearch = await elasticClient.index({
            index: 'song',
            document: {
                ...data,
            },
        })
        return createSong
    }


    async searchSong(query) {
        const result = await elasticClient.search({
            index: 'song',
            query: {
                multi_match: {
                    query: query,
                    fields: ['name', 'musician', 'singer', 'tone', 'hashtag'],
                    fuzziness: 'AUTO',
                },
            },
        })
        return result.hits
    }

    async getAllSongs() {
        console.log("run here")
        return await Song.findAll()
    }

    async getDetail(id){
        const song = await Song.findByPk(id)
        if(!song){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist',
            )
        }
        return song;
    }
}

module.exports = new SongService()
