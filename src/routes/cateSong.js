const express = require('express')
const router = express.Router()
const CategoriesSongController = require('../app/controllers/CategoriesSongController')
const passport = require('passport')
const cateValidate = require('../app/validations/cate.validations')
const validate = require('../app/middlewares/validate')
const validateRole = require('../app/middlewares/validateRole')
const { handleQuery } = require('../app/middlewares/query')

router.get('/search', CategoriesSongController.search)

router.get('/', handleQuery, CategoriesSongController.index)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    validate(cateValidate.createCateSchema),
    CategoriesSongController.create,
)

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    CategoriesSongController.detail,
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validate(cateValidate.updateCateSchema),
    validateRole,
    CategoriesSongController.update,
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validateRole,
    CategoriesSongController.delete,
)

module.exports = router
