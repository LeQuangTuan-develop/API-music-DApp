const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 1,
            max: 100,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

module.exports = mongoose.model('User', UserSchema)
