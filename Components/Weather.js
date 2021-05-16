'use strict';
const weather = require('../Data/weather.json');
const superagent = require('superagent');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
require('dotenv').config();
let inMemory = require('./cashe');


/*------------------------------------------------------------------------------------
STATIC
creating a new end-point  (requsedt data from own API-staticlly)

app.get('/weather', function (req, res) {
const arrOfData = weather.data.map(data => new Weather(data));  // mapping through the data to get an array for each day
res.send(arrOfData);     //send the array to the cleint who requested the data from weather end-point
})
------------------------------------------------------------------------------------*/

// DYNAMIC ..to get the data from weatherbit
const getWeather = function (req, res) { //call back function

  //console.log(req.query); //to accses the request query string(search queries)(here is lon and lat)
  // res.send('weatherbit');
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const search = `${lat}${lon}`;

  const queryParams = {
    key: WEATHER_API_KEY,
    lat: req.query.lat,
    lon: req.query.lon,
  };
  if (inMemory[search]) {
    console.log('will get the data from the cashe memory');
    res.send(inMemory[search]);
  }
  else {
    superagent.get(weatherUrl).query(queryParams).then(bitData => {

      //not in cashe
      const arrOfData = bitData.body.data.map(data => new Weather(data));
      inMemory[search] = arrOfData;
      res.send(arrOfData);
      console.log('will get the data from the API');
      console.log('to store the data into cashe memory');
      //.body beacuse we will not work on the div.. we need to work on the body to get the actual data
    }).catch(console.error());
  }
  // .catch (console.error());

  // } catch (error) {
  //   // const arrOfData = weather.data.map(data => new Weather(data));  //to get the data statically, in case of error
  //   // res.send(arrOfData);
  //   console.log(error);


};




class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = getWeather;

// module.exports = {
//     getWeather,
//     name: 'Enas'
// }; : in case to export more than fun or var





