const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/User.controller')
const passport = require('passport')

router.get(
    '/playlist',
    UserController.randomPlaylist
)

router.get('/test', UserController.test)
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    UserController.index
)
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    UserController.show
)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    UserController.update
)
router.delete(
    '/:id',
    UserController.delete
)

module.exports = router
