const express = require('express')
const userRouter = require('./user')
const authRouter = require('./auth')
const catesRouter = require('./cateSong')

const apiRoute = express()

apiRoute.use('/cates', catesRouter)
apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)

module.exports = apiRoute
