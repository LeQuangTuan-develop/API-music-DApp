const httpStatus = require('http-status')
const { SongCategory } = require('../models')

class CategoriesService {
    async getListCategories() {
        console.log('run here')
        return await SongCategory.findAll()
    }

    async createCateSong(data) {
        if (await SongCategory.findOne({ where: { name: data.name } })) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'This cate of song already taken')
        }
        const newSongCategory = new SongCategory(data)
        const saveCateSong = await newSongCategory.save()

        return saveCateSong
    }

    async updateCate(id, body) {
        const cateSong = await SongCategory.findByPk(id)
        if (!cateSong)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate does not exist'
            )

        Object.keys(body).forEach((key) => {
            console.log(body[key])
            cateSong[key] = body[key]
        })
        await cateSong.save()
        return cateSong
    }

    async deleteCate(id) {
        const deleteCate = await SongCategory.destroy({
            where: {
                _id: id,
            },
        })
        if (!deleteCate)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate does not exist'
            )

        return deleteCate
    }

    async getDetail(id) {
        const cateSong = await SongCategory.findByPk(id)
        if (!cateSong)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate does not exist'
            )

        return cateSong
    }

}


module.exports = new CategoriesService()