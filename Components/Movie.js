'use strict';
require('dotenv').config();
let MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const superagent = require('superagent');
let inMemory = require('./cashe');


const getMovie = (req, res) => {

  //console.log(req.query);
  const movieURL = `https://api.themoviedb.org/3/search/movie`;
  const search = req.query.query;

  const queryParams = {
    api_key: MOVIE_API_KEY,
    query: req.query.query,

  };
  if (inMemory[search]) {
    console.log('will get the data from the cashe memory');
    res.send(inMemory[search]);
  }


  else {
    superagent.get(movieURL).query(queryParams).then(movieData => {//not in cashe
      const arrOfData = movieData.body.results.map(data => new Movie(data));
      inMemory[search] = arrOfData;
      res.send(arrOfData);
      console.log('will get the data from the API');
      console.log('to store the data into cashe memory');
      //.body beacuse we will not work on the div.. we need to work on the body to get the actual data



    }).catch(console.error());

  }

};

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.movieImage = data.poster_path;
  }
}

module.exports = getMovie;