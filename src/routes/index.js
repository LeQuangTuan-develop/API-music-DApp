const express = require('express')
const userRouter = require('./user')
const authRouter = require('./auth')
const genreRouter = require('./genre')
const catesRouter = require('./cateSong')
const songRouter = require('./song')

const apiRoute = express()

apiRoute.use('/cates', catesRouter)
apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)
apiRoute.use('/genres', genreRouter)
apiRoute.use('/songs', songRouter)

module.exports = apiRoute
