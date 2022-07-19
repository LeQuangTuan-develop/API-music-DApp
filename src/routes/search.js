const express = require('express')
const router = express.Router()
const SearchController = require('../app/controllers/Search.controller')

router.get('/findbyname', SearchController.findByName)
router.get('/all', SearchController.index)
router.post('/create', SearchController.create)
router.delete('/delete/:id', SearchController.delete)
router.patch('/update/:id', SearchController.update)

module.exports = router
