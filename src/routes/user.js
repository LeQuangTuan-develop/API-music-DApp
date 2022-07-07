const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/User.controller')
const passport = require('passport')

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    userController.index
)
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    userController.show
)
router.post('/', userController.create)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    userController.update
)
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    userController.delete
)

module.exports = router
