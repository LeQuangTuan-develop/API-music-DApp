const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rfs = require('rotating-file-stream')
const path = require('path')

const route = require('./src/routes')
const db = require('./models/index')
const passport = require('passport')
const compression = require('compression')

dotenv.config()

const db = require('./models/index')
const db = require('./src/configs/db')
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


// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
