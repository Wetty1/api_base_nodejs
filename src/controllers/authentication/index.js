const express = require('express')
const routes = express.Router()
const Login = require('./login')
const Register = require('./register')
const Forgot = require('./forgot')

routes.get('/login', Login.index)

routes.post('/login', Login.login)

routes.get('/register', Register.index)

routes.post('/register', Register.register)

routes.post('/forgot', Forgot.forgotPass)

routes.post('/reset_password', Forgot.resetPass)

module.exports = routes
