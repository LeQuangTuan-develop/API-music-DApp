const express = require('express')
const passport = require('passport')

const AuthController = require('../app/controllers/Genre.controller')
const authValidation = require('../app/validations/auth.validation')
const validate = require('../app/middlewares/validate')
const { get } = require('mongoose')
const GenreController = require('../app/controllers/Genre.controller')

const router = express.Router()

// get api/search
router.get('/', GenreController.getAllElastic)

router.post('/', GenreController.createGenresElastic)

router.delete('/', GenreController.deleteGenresElastic)

router.get('/searchGenres', GenreController.searchGenres)
module.exports = router
