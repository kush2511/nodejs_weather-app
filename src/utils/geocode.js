const request = require("request");
const chalk = require('chalk');

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1Ijoia3VzaDI1MTEiLCJhIjoiY2tjb3FpZmlqMG5ycjJ5bGhra3FiNmQ4NCJ9.Ttyg7f3V_sU58fEjYhXIiA&limit=1";

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to location server!", undefined);
        } else if(response.body.features.length === 0){
            callback("Unable to find a location!", undefined)
        } else{
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;