const httpStatus = require('http-status')
const { SongCategory } = require('../models')
const ApiError = require('../../utils/apiError')

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

    async getPage(req, res) {
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
        const findID = await SongCategory.findByPk(id)
        if (!findID)
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'This cate does not exist'
            )
        if(findID){
            const updateCateSong = await SongCategory.update(
                {
                    ...body,
                },
                 {
                where: {
                    _id: id
                }
            }
        )
            return await SongCategory.findByPk(id)
        }
        return findID
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
