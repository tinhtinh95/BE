const request = require('request');
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        q: {
            demand: true,
            alias: 'City',
            descibe: 'City to get weather information',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
    
console.log(argv);
const qEncode = encodeURIComponent(argv.q);
var geoUrl = `https://samples.openweathermap.org/data/2.5/weather?q=${qEncode}&appid=b6907d289e10d714a6e88b30761fae22`;

axios.get(geoUrl)
.then(response => {
    console.log(response.data);
})
.catch(e=>{
    if(e.code === "ENOTFOUND"){
        console.log('Unable to connect API');
    // }else {
    //     console.log()
    }

})