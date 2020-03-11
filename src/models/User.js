const mongoose = require('./../database/mongodb')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
})

User.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

module.exports = mongoose.model('user', User)