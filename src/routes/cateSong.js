const express = require('express')
const router = express.Router()
const CategoriesSongController = require('../app/controllers/CategoriesSongController')
const passport = require('passport')

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.index
)

router.post('/create', 
passport.authenticate('jwt', { session: false }),
CategoriesSongController.create)

router.get(
    '/:id',
    // passport.authenticate('jwt', { session: false }),
    CategoriesSongController.detail
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.update
)


router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.delete
)

module.exports = router