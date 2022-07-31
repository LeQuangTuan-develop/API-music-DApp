const httpStatus = require('http-status')
const { SongCategory } = require('../models')
const ApiError = require('../../utils/apiError')
const SongCategoryRepository = require('../repositories/SongCategory.repository')
class CategoriesService {
    async createCateSong(data) {
        if (await SongCategory.findOne({ where: { name: data.name } })) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate of song already taken',
            )
        }
        const newSongCategory = new SongCategory(data)
        const saveCateSong = await newSongCategory.save()

        return saveCateSong
    }

    async getSongCategories(query) {
        const fieldAllow = ['name']
        const value = SongCategoryRepository.findAndPaginate(
            query.conditions,
            query.orderBy || [],
            query._page,
            query._size,
            fieldAllow,
        )

        return value
    }

    async updateCate(id, body) {
        const cate = await SongCategory.findByPk(id)

        if (!cate)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist',
            )

        await Genre.update(
            {
                ...body,
            },
            {
                where: { _id: id },
            },
        )
        return body
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
                'This cate does not exist',
            )

        return deleteCate
    }

    async getDetail(id) {
        const cateSong = await SongCategory.findByPk(id)
        if (!cateSong)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate does not exist',
            )

        return cateSong
    }

    async search(search) {
        const result = await SongCategoryRepository.search(search)
        return result
    }
}

module.exports = new CategoriesService()
