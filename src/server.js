const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.Server(app)

//app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes')(app)

/* QUANDO NENHUMA ROTA É ENCONTRADA */
app.get('*', function(req, res){
    res.status(404).json({"error": "Request not found!"});
})

server.listen(3000)

