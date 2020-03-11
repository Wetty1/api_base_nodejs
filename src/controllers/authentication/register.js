const User = require('../../models/User')
const token = require('./token')

module.exports = {
    async index (req, res) {
        return res.send('page register')
    },
    async register (req, res) {
        const { email } = req.body
        try {
            if(await User.findOne({ email }))
                return res.send(400).send({ error: 'User alredy exists' })

            const user = await User.create(req.body)

            user.password = undefined

            return res.send({ 
                user,
                token: token.generateToken({ id: user.id })
             })
        } catch (error) {
            return res.status(400).send({ erro: 'registration failed: '+ error })
        }
    }
}