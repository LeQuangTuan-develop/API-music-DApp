const express = require('express')
const userRouter = require('./user')
const authRouter = require('./auth')
const genreRouter = require('./genre')
const catesRouter = require('./cateSong')
const searchRouter = require('./search')

const apiRoute = express()

apiRoute.use('/cates', catesRouter)
apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)
apiRoute.use('/genres', genreRouter)
apiRoute.use('/search', searchRouter)

module.exports = apiRoute
