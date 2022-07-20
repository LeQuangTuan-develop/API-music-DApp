const httpStatus = require('http-status')
const { SongCategory } = require('../models')
const ApiError = require('../../utils/apiError')
const { Op } = require('sequelize')
class CategoriesService {

    async createCateSong(data) {
        if (await SongCategory.findOne({ where: { name: data.name } })) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate of song already taken'
            )
        }
        const newSongCategory = new SongCategory(data)
        const saveCateSong = await newSongCategory.save()

        return saveCateSong
    }

    async getPage(req) {
        const cates = await SongCategory.findAndCountAll({
            limit: req.query._size,
            offset: req.query._page * req.query._size,
        })

        if (!Number.isNaN(req.query._page ) && req.query._page  > 0) {
            if(req.query._page >Math.ceil(cates.count/req.query._size)){
                req.query._size = 0
            }
        }

        const value = {
            countAll: cates.count,
            countItem: req.query._size,
            page: req.query._page +1,
            data: cates.rows, 
            totalPages: Math.ceil(cates.count/req.query._size)
        }

        return value
    }

    async updateCate(id, body) {
        const cate = await SongCategory.findByPk(id)

        if (!cate)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This genre does not exist'
            )

        const cate1 = await SongCategory.findAll({
            where: {
                [Op.and]: [
                    {
                        name: body.name,
                    },
                    {
                        _id: {
                            [Op.ne]: id,
                        },
                    },
                ],
            },
        })

        if (cate1.length > 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'This genre is exist')
        }

        await Genre.update(
            {
                ...body,
            },
            {
                where: { _id: id },
            }
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
