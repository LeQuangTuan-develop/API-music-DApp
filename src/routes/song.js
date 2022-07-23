const express = require('express')
const router = express.Router()
const passport = require('passport')
const SongController = require('../app/controllers/Song.controller')
const validate = require('../app/middlewares/validate')
const { createSongSchema } = require('../app/validations/song.validation')

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validate(createSongSchema),
    SongController.create,
)

router.get('/', SongController.index)

router.get('/:id', SongController.getDetail)

module.exports = router
