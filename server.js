'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getWeather = require('./Components/Weather');
const getMovie = require('./Components/Movie');
const app = express();
app.use(cors());
let PORT = process.env.PORT;


app.get('/', function (req, res) {
  // res.send(data)
  res.send('check')
})


// console.log(showWeather.name);
// app.get('/weather', showWeather.getWeather); in case of exporting obj, contains more than a fun

app.get('/weather', getWeather);

app.get('/movie', getMovie);

app.listen(PORT, () => console.log(`app is listening on ${PORT}`))
