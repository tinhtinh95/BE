const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
geocode.geoCodeCity(argv.q, (errMsg, rs) => {
    if(errMsg){
        console.log(errMsg);
    }else{
        console.log(JSON.stringify(rs, undefined,2))
    }
});