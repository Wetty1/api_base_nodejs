const mongoose = require('mongoose')
require('dotenv/config') /* PERMITE O USO DAS VARIAVEIS DE AMBIENTE */

/* ABRE UMA CONEXÃO COM O BANCO DE DADOS MONGODB */
mongoose.connect(process.env.MONGO_CONNECTION_LINK, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("MongoDB conected!"))
    .catch((error) => console.error('Error: '+error))

/* ASSINA UMA CONEXÃO COM PROMESSA */
mongoose.Promise = global.Promise

module.exports = mongoose /* Exporta a constante mongoose */
