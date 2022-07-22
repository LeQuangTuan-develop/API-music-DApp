const express = require('express')
const router = express.Router()
const passport = require('passport')
const GenreController = require('../app/controllers/Genre.controller')
const genreValidation = require('../app/validations/genre.validation')
const validate = require('../app/middlewares/validate')
const validateRole = require('../app/middlewares/validateRole')

router.get('/search', GenreController.search)

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.index
)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    validate(genreValidation.checkGenre),
    GenreController.create
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    validate(genreValidation.checkGenre),
    GenreController.update
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.delete
)

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.getDetail
)

module.exports = router
