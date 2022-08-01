const { Song } = require('../models')
const elasticClient = require('../../configs/elastic-client.config')
const ApiError = require('../../utils/apiError')
const { songStatus } = require('../../configs/songStatus.config')
const httpStatus = require('http-status')
class SongService {
    async createSong(data) {
        data.lyricRendered = JSON.stringify(data.lyricRendered)
        const newSong = new Song(data)
        const createSong = await newSong.save()
        const saveToElasticSearch = await elasticClient.index({
            index: 'song',
            id: createSong._id,
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
        return await Song.findAll()
    }

    async getDetail(id) {
        const song = await Song.findByPk(id)
        if (!song) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist'
            )
        }
        return song
    }

    async updatePending(id) {
        const songId = await Song.findByPk(id)
        if (!songId)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist'
            )
        const song = await Song.update(
            {
                status: songStatus.PENDING,
            },
            {
                where: { _id: id },
            }
        )
        return song
    }

    async updatePublish(id) {
        const songId = await Song.findByPk(id)
        if (!songId)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist'
            )
        const song = await Song.update(
            {
                status: songStatus.PUBLISH,
            },
            {
                where: { _id: id },
            }
        )
        return song
    }

    async updateRefuse(id) {
        const songId = await Song.findByPk(id)
        if (!songId)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist'
            )
        const song = await Song.update(
            {
                status: songStatus.REFUSE,
            },
            {
                where: { _id: id },
            }
        )
        return song
    }

    async updateHide(id) {
        const songId = await Song.findByPk(id)
        if (!songId)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This song does not exist'
            )
        const song = await Song.update(
            {
                status: songStatus.HIDE,
            },
            {
                where: { _id: id },
            }
        )
        return song
    }
}

module.exports = new SongService()
