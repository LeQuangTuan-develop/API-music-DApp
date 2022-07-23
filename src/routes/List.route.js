const express = require('express')
const router = express.Router()
const ListSongController = require('../app/controllers/PlayList.controller')
//const passport = require('passport')
//const cateValidate = require('../app/validations/cate.validations')
//const validate = require('../app/middlewares/Validate.middleware')

router.get(
    '/newsong',ListSongController.show
)

module.exports = router