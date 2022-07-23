const express = require('express')
const userRouter = require('./User.route')
const authRouter = require('./Auth.route')
const genreRouter = require('./genre')
const catesRouter = require('./cateSong')
const listRouter = require('./List.route')


const apiRoute = express()

apiRoute.use('/cates', catesRouter)
apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)
apiRoute.use('/genre', genreRouter)
apiRoute.use('/list', listRouter)

module.exports = apiRoute
