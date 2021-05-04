const express = require('express')
const cors = require('cors')
const data = require('./Data/weather.json')
const { json } = require('express')
require('dotenv').config()
let PORT = process.env.PORT
const app = express()
app.use(cors())
app.get('/', function (req, res) {
    res.send(data)
})
app.listen(PORT)





