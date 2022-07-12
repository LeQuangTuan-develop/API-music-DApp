const mongoose = require('mongoose')

// connect to mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASS1}@dappcv.zn9felp.mongodb.net/DappCV?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { connectDB }
