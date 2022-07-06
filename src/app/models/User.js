const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const Schema = mongoose.Schema

const { toJSON, paginate } = require('./plugins')

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
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
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error(
                        'Password must contain at least one letter and one number'
                    )
                }
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
)

UserSchema.plugin(toJSON)
UserSchema.plugin(paginate)

// UserSchema.methods.toJSONNew = function () {
//     const obj = this.toObject()
//     delete obj.password
//     delete obj.ethereum_account_private_key
//     return obj
// }

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

module.exports = mongoose.model('User', UserSchema)
