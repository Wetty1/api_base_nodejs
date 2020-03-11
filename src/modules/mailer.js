const nodemailer = require('nodemailer')
require()

const host = process.env.MAILER_HOST
const port = process.env.MAILER_PORT
const user = process.env.MAILER_USER
const pass = process.env.MAILER_PASS
const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
})

module.exports = transport