const User = require('./../../models/User')
const mailer = require('../../modules/mailer')
const crypto = require('crypto')

module.exports = {
    async forgotPass (req, res) {
        const { email } = req.body

        console.log(email)
        
        try {
            const user = await User.findOne({ email })

            if(!user)
                return res.status(400).send({ error: 'User not found' })

            const token = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours() + 1)

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            })

            mailer.sendMail({
                to: email,
                from: 'wettygamer@gmail.com',
                subject: 'Esqueceu a senha?',
                text: 'Recupere a sua senha.',
                html: '<p>Esqueceu a senha? Não se preocupe use o token '+token+' para recuperar sua senha.</p>'
            }, (err) => {
                if(err)
                    return res.send({ Error: 'Cannot send forgot password email' })
            })
        } catch (error) {
            res.status(400).send({ 'Error': 'Error on forgot password, try again'})
        }

        return res.send({ ok: true })
    },
    async resetPass (req, res) {
        const { password, token, email } = req.body

        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires')

        if (!user) 
            return res.status(400).send({ error: 'User not found' })

        const now = new Date
        console.log(now < user.passwordResetExpires)
        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired' })
        
        if(user.passwordResetToken !== token)
            return res.status(400).send({ error: 'Token invalid'})
            
        user.password = password
        await user.save()

        return res.send({ ok: true })
    }
}