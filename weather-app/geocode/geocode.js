const request= require('request');
var geoCodeCity = (city, callback) =>{
    const qEncode = encodeURIComponent(city);

request({
    url: `https://samples.openweathermap.org/data/2.5/weather?q=${qEncode}&appid=b6907d289e10d714a6e88b30761fae22`,
    json: true
}, (error, response, body) =>{
    if(error){
        callback('Unable to collect to the servers.')
    } else if(body){
        console.log(`${body.main.temp}`);
        callback(undefined, {
            city: body.main.temp
        })
    }
    // body.status ....
    // console.log(JSON.stringify(response, body, 2));
}) 
}
module.exports.geoCodeCity = geoCodeCity;