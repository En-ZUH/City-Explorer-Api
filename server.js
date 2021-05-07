const express = require('express')

const cors = require('cors')

const weather = require('./Data/weather.json') //import weather file

const { json } = require('express')

require('dotenv').config()
s

let PORT = process.env.PORT

let WEATHER_API_KEY = process.env.WEATHER_API_KEY

const app = express()

app.use(cors())


app.get('/', function (req, res) {
    res.send('check')
    // res.send('check')
})

app.get('/weather', function (req, res) { // creating a new end-point  
    const url = `${WEATHER_API_KEY}`
    const arrOfData = weather.data.map(data => new Weather(data)); // mapping through the data to get an array for each day
    res.send(arrOfData); //send the array to the cleint whoo requested the data from weather end-point

})

class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

app.listen(PORT, () => console.log(`app is listening on ${PORT}`))


