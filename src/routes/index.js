const express = require('express')
const userRouter = require('./user')
const authRouter = require('./auth')

const apiRoute = express()

apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)

module.exports = apiRoute
