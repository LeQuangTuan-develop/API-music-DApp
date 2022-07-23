const httpStatus = require('http-status')
const CategoriesService = require('../services/Categories.service')
const { dataResponse } = require('../../utils/Response.util')

class CategoriesSongController{
    async index(req, res, next) {
        try {
            const cates = await CategoriesService.getListCategories()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, cates))
        } catch (error) {
            next(error)
        }
    }

    
    async create(req, res, next) {
        try {
            const saveCateSong = await CategoriesService.createCateSong(req.body)
            res.status(httpStatus.CREATED).json(
                dataResponse(
                    httpStatus.OK,
                    saveCateSong,
                    'Create new cate of song successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const updateCate = await CategoriesService.updateCate(id, req.body)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    updateCate,
                    'Update cate successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    // DELETE users/:id
    async delete(req, res, next) {
        try {
            const id = req.params.id
            const deleteCate = await CategoriesService.deleteCate(id)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    deleteCate,
                    'Delete cate successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async detail(req, res, next) {
        try {
            const id = req.params.id;
            const detail = await CategoriesService.getDetail(id)
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, detail)
            )
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new CategoriesSongController();