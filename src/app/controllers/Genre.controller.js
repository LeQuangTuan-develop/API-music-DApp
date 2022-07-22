const httpStatus = require('http-status')
const GenreService = require('../services/Genre.service')
const { dataResponse } = require('../../utils/response')
const elasticClient = require('../../configs/elastic-client')
class GenreController {
    // GET Genres
    async index(req, res, next) {
        try {
            const genres = await GenreService.getAllGenres()
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, genres))
        } catch (error) {
            next(error)
        }
    }

     // POST genres/:id
     async create(req, res, next) {
        try {
            const saveGenre = await GenreService.createGenre(req.body)
            res.status(httpStatus.CREATED).json(
                dataResponse(
                    httpStatus.OK,
                    saveGenre,
                    'Create new genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

     // PUT genres/:id
     async update(req, res, next) {
        try {
            const id = req.params.id
            const updateGenre = await GenreService.updateGenre(id, req.body)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    updateGenre,
                    'Update info genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

     // DELETE genres/:id
     async delete(req, res, next) {
        try {
            const id = req.params.id
            const deleteGenre = await GenreService.deleteGenre(id)
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    deleteGenre,
                    'Delete genre successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }
    //Get detail
    async getDetail(req, res, next) {
        try {
            const id = req.params.id
            const genres = await GenreService.getDetail(id)
            res.status(httpStatus.OK).json(dataResponse(httpStatus.OK, genres))
        } catch (error) {
            next(error)
        }
    }

    async getAllElastic(req,res, next){
        try {
            const result = await elasticClient.search({
                index:"genres",
                query:{match_all:{}},
            })
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits,
                    'GetALL Successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async createGenresElastic(req,res, next){
        try {
            const result = await elasticClient.index({
                index:"genres",
                document: {
                    name: req.body.name,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl,
                },
            })
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits,
                    'Create in Elastic Successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async  deleteGenresElastic(req,res, next){
        try {
            const result = await elasticClient.delete({
                index: "genres",
                id: req.query._id,
            }) 
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits,
                    'Delete in Elastic Successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }

    async  searchGenres(req,res, next){
        try {
            console.log(req.query)
            console.log(req.query.query)
            const result = await elasticClient.search({
                index: "genres",
                "query" : {
                    "multi_match" : {
                        "query":     req.query.query,
                        "type":       "phrase_prefix",
                        "fields":     [ "name", "description","imageUrl" ]
                    }
                }
               
            })
           
            res.status(httpStatus.OK).json(
                dataResponse(
                    httpStatus.OK,
                    result.hits,
                    'Search in Elastic Successfully'
                )
            )
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new GenreController();