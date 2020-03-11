/* CADA ROTA APONTA PARA UMA PASTA NO CONTROLLER */

module.exports = app => {
    app.use('/home', require('./controllers/home/index'))

    app.use('/auth', require('./controllers/authentication/index'))
}
