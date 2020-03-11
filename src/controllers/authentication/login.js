const User = require('./../../models/User')
const bcrypt = require('bcrypt')
const token = require('./token')


module.exports = {
    async index (req, res) {
        return res.send('page login ok')
    },
    async login (req, res) {
        let { email, password } = req.body
        console.log(email , password)

        const user = await User.findOne({ email }).select('+password')

        if(!user) 
            return res.status(400).json({ Error: 'User not found!'})
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({ Error: 'Invalid password'})

        user.password = undefined

        return res.send({
             user, 
             token: token.generateToken({ id:user.id }) 
        })
      
        
    }
}