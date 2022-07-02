const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/User.controller')

router.get('/', userController.index)
router.get('/:id', userController.show)
router.post('/', userController.create)

module.exports = router
