const express = require('express')
const router = express.Router()
const passport = require('passport')
const SongController = require('../app/controllers/Song.controller')
const validate = require('../app/middlewares/validate')
const { createSongSchema } = require('../app/validations/song.validation')
const validateRole = require('../app/middlewares/validateRole')

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validate(createSongSchema),
    SongController.create
)

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    // validateRole,
    SongController.index
)


router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    SongController.getDetail
)

module.exports = router
