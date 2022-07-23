const express = require('express')
const router = express.Router()
const CategoriesSongController = require('../app/controllers/CategoriesSongController')
const passport = require('passport')
const cateValidate = require('../app/validations/cate.validations')
const validate = require('../app/middlewares/Validate.middleware')

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.index
)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validate(cateValidate.createCateSchema),
    CategoriesSongController.create
)

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.detail
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validate(cateValidate.updateCateSchema),
    CategoriesSongController.update
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    CategoriesSongController.delete
)

module.exports = router
