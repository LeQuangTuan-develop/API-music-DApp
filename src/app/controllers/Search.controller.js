const elasticClient = require('../../configs/elasticSearch')
const { dataResponse } = require('../../utils/response')
const httpStatus = require('http-status')

class SearchController {
    async findByName(req, res, next) {
        try {
            const result = await elasticClient.search({
                index: 'customer',
                body: {
                    query: {
                        match: { name: 'Tuan' },
                    },
                },
            })
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits.hits,
                    'search successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async index(req, res, next) {
        try {
            const result = await elasticClient.search({
                index: 'customer',
                query: { match_all: {} },
            })
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits.hits,
                    'search successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const result = await elasticClient.index({
                index: 'customer',
                document: {
                    name: req.body.name,
                    age: req.body.age,
                    major: req.body.major,
                },
            })
            res.status(httpStatus.CREATED).json(
                dataResponse(httpStatus.CREATED, result, 'create successfully')
            )
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const result = await elasticClient.update({
                index: 'customer',
                id: req.params.id,
                doc: {
                    name: req.body.name,
                },
            })
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, result, 'update successfully')
            )
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const result = await elasticClient.delete({
                index: 'customer',
                id: req.params.id,
            })
            res.status(httpStatus.OK).json(
                dataResponse(httpStatus.OK, result, 'delete successfully')
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SearchController()
