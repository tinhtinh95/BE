const request = require('request');

const getTemperature = (lat, long, callBack) => {
    request({
        url: `https://api.darksky.net/forecast/72b74cbc94f78a3c9833a8ec858b6ad3/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callBack(undefined, { temperature: body.currently.temperature});
        }else{
            callBack('Unable to fetch weather');
        } 
    })
}
module.exports.getTemperature = getTemperature;