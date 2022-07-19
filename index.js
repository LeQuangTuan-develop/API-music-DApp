const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rfs = require('rotating-file-stream')
const path = require('path')

const passport = require('passport')
const compression = require('compression')

dotenv.config()

const db = require('./src/app/models/index')
const route = require('./src/routes')
const { jwtStrategy } = require('./src/app/middlewares/passport')
const { errorConverter, errorHandler } = require('./src/app/middlewares/error')

const app = express()

const port = process.env.PORT || 4000
const isProduction = process.env.NODE_ENV === 'production'
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log'),
})

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(
    isProduction
        ? morgan('combined', { stream: accessLogStream })
        : morgan('dev')
)
app.use(
    compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if (req.headers['x-no-compress']) {
                return false
            }
            return compression.filter(req, res)
        },
    })
)
passport.use('jwt', jwtStrategy)
app.use(passport.initialize())

app.use('/api', route)

app.use('/', function (req, res, next) {
    res.status(200).json({
        message: 'Chicken Floor say ò ó o',
    })
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
