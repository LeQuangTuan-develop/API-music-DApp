const express = require('express')
const router = express.Router()
const passport = require('passport')
const GenreController = require('../app/controllers/Genre.controller')
const genreValidation = require('../app/validations/genre.validation')
const validate = require('../app/middlewares/Validate.middleware')
const validateRole = require('../app/middlewares/ValidateRole.middleware')

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.index
)

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    validate(genreValidation.checkGenre),
    GenreController.create
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.update
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    GenreController.delete
)

module.exports = router