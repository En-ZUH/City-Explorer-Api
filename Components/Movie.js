require('dotenv').config();
let MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const superagent = require('superagent');


const getMovie = (req, res) => {
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

};

class Movie {
    constructor(data) {
        this.title = data.original_title;
        this.overview = data.overview;
        this.movieImage = data.poster_path;
    }
}

module.exports = getMovie;