const express = require('express')
const userRouter = require('./user')

const apiRoute = express()

apiRoute.use('/users', userRouter)

module.exports = apiRoute
