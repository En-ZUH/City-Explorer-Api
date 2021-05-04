const express = require('express')
const cors = require('cors')
const weather = require('./Data/weather.json')
const { json } = require('express')
require('dotenv').config()
let PORT = process.env.PORT
const app = express()
app.use(cors())
app.get('/', function (req, res) {
  res.send(data)
})
app.get('/weather', function (req, res) {
  const arrOfData = weather.data.map(data => new Weather(data));
  res.send(arrOfData);
})
class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}
app.listen(PORT)

