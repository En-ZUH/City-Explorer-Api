const express = require('express');
const cors = require('cors');
const { json } = require('express');
require('dotenv').config();
const showWeather = require('./Components/Weather');
const app = express();
app.use(cors());
const showMovie = require('./Components/Movie');
let PORT = process.env.PORT


app.get('/', function (req, res) {
  // res.send(data)
  res.send('check')
})

// console.log(showWeather.name);
// app.get('/weather', showWeather.getWeather); in case of exporting obj, contains more than a fun

app.get('/weather', showWeather);

app.get('/movie', showMovie);

app.listen(PORT, () => console.log(`app is listening on ${PORT}`))
