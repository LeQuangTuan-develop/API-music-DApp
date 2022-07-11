const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const rfs = require('rotating-file-stream')
const path = require('path')

const route = require('./src/routes')
const db = require('./models/index')

dotenv.config()
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

app.use('/api', route)


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
