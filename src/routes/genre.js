const express = require('express')
const router = express.Router()
const passport = require('passport')
const GenreController = require('../app/controllers/Genre.controller')
const genreValidation = require('../app/validations/genre.validation')
const validate = require('../app/middlewares/validate')

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    GenreController.index
)

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    validate(genreValidation.checkGenre),
    GenreController.create
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    GenreController.update
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    GenreController.delete
)

module.exports = router