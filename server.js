const express = require('express')
const superagent = require('superagent');

const cors = require('cors')

const weather = require('./Data/weather.json') //import weather file
const { json } = require('express')
require('dotenv').config()


let PORT = process.env.PORT
let WEATHER_API_KEY = process.env.WEATHER_API_KEY
let MOVIE_API_KEY = process.env.MOVIE_API_KEY



const app = express()

app.use(cors())


app.get('/', function (req, res) {
  // res.send(data)
  res.send('check')
})

// STATIC
// creating a new end-point  (requsedt data from own API-staticlly)

//app.get('/weather', function (req, res) {
//const arrOfData = weather.data.map(data => new Weather(data));  // mapping through the data to get an array for each day
//res.send(arrOfData);     //send the array to the cleint who requested the data from weather end-point
// })


// DYNAMIC ..to get the data from weatherbit
app.get('/weather', function (req, res) {
  try {
    //console.log(req.query); //to accses the request query string(search queries)(here is lon and lat)
    // res.send('weatherbit');
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;


    superagent.get(weatherUrl).then(bitData => {
      const arrOfData = bitData.body.data.map(data => new Weather(data));
      res.send(arrOfData);
      //.body beacuse we will not work on the div.. we need to work on the body to get the actual data
    }).catch(console.error());
  }
  catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));  //to get the data statically, in case of error
    res.send(arrOfData);

  };

});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}








app.get('/movie', function (req, res) {
  try {
    //console.log(req.query);
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;

    superagent.get(movieURL).then(movieData => {
      const arrOfData = movieData.body.results.map(data => new Movie(data));
      res.send(arrOfData);

    })
  }
  catch (error) {
    console.log('error');
  };

});

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.movieImage = data.poster_path;
  }
}


app.listen(PORT, () => console.log(`app is listening on ${PORT}`))
