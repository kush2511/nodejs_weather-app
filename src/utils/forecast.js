const request = require("request");
const chalk = require('chalk');

const forecast = (latitude, longitude,  callback) => {
    const url = "http://api.weatherstack.com/current?access_key=41074261779ca035eb196a179bfa574e&query=" + latitude + "," + longitude;

    request({url: url, json: true}, (error,response) => {
        if(error) {
            callback("Unable to connect to weather server!", undefined);
        } else if(response.body.error) {
            callback("Unable to find location!", undefined);
        } else{
            callback(undefined,"It is " + response.body.current.weather_descriptions[0] + " outside. Current temperature is " + response.body.current.temperature + " degrees. It's feels like " + response.body.current.feelslike + " & there is "+ response.body.current.precip + "% precipitation.")
        }
    });
}

module.exports = forecast;