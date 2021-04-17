const express = require('express')
const cookieParser = require('cookie-parser')
const axios = require('axios');
const { throwError } = require('rxjs');

const appId = '485aadc24a72037f4b275f596b02d236'
const app = express();

const port = process.env.port || 4200

app.listen(port, () => {
    console.log('Express server is listening to port ' + port);
})

app.use(express.json())
app.use(cookieParser())
app.use('/', express.static('dist/weather-app'))

app.get('/current-weather', (req, res) => {
    let params = 'units=' + req.query.units +
    '&lat=' + req.query.lat +
    '&lon=' + req.query.lon +
    '&APPID=' + appId;
    console.log(params)
    axios.get('https://api.openweathermap.org/data/2.5/weather?' + params).then(response => {
        res.send(response.data)
    }).catch(err => {
        res.status(err.response.status);
        res.send(err.response.data);
        console.log('Error getting current weather');
    })
})

app.get('/forecast-weather', (req, res) => {
    let params = 'units=' + req.query.units +
    '&lat=' + req.query.lat +
    '&lon=' + req.query.lon +
    '&APPID=' + appId;
    axios.get('https://api.openweathermap.org/data/2.5/forecast?' + params).then(response => {
        res.send(response.data)
    }).catch(err => {
        res.status(err.response.status);
        res.send(err.response.data);
        console.log('Error getting forecast weather');
    })
})