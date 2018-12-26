const request = require('request');

var temperatureCity = (city) =>{
    return new Promise((resolve, reject)=>{
        const qEncode = encodeURIComponent(city);

        request({
            url: `https://samples.openweathermap.org/data/2.5/weather?q=${qEncode}&appid=b6907d289e10d714a6e88b30761fae22`,
            json: true
        }, (error, response, body) =>{
            if(error){
                reject('Unable to collect to the servers.')
            } else if(body){
                console.log(`${body.main.temp}`);
                resolve({
                    city: body.main.temp
                });
            }
        }) 
    })
}

temperatureCity('London, uk')
.then((temperature) => {
    console.log(JSON.stringify(temperature,undefined,2));
}, (errMes) =>{
    console.log(errMes);
})