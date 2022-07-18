const express = require('express')
const userRouter = require('./user')
const authRouter = require('./auth')
const genreRouter = require('./genre')

const apiRoute = express()

apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)
apiRoute.use('/genre', genreRouter)

module.exports = apiRoute
