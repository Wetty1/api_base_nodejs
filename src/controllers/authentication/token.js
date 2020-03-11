const jwt = require('jsonwebtoken')

module.exports = {
    generateToken (params = {}) {
        return jwt.sign(params, process.env.KEY_SECRET, {
            expiresIn: 86400,
        })
    }
}