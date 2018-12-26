const yargs = require('yargs');
const temp = require('./getTemperature');
const argv = yargs
    .options({
        lat: {
            demand: true,
            alias: 'latitude',
            string: true,
            describe: 'The latitude of the place want to get temperature'
        },
        long: {
            demand: true,
            alias: 'Longtitute',
            string: true,
            describe: 'The longtitude of the place want to get temperature'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

temp.getTemperature(argv.lat, argv.long, (errMsg, result) => {
    if(errMsg) {
        console.log(errMsg)
    }else{
        console.log(JSON.stringify(result, undefined, 2));
    }
})
