console.log('ahihi');
const fs = require('fs');

const os = require('os');
var user = os.userInfo();
console.log(user);
fs.appendFile('greetings.txt', `Hello ${user.username} \n`, function(err){
    if(err) {
        console.log('Unable to write to file');
    }
});

// console.log(module)

var notes = require('./notes.js');
// console.log(notes.age)
// console.log('rs: ', notes.add(1,2));


const _ = require('lodash');
var filterArray = _.uniq(['Tina', 1,2, 1,2, 'Tina']);
console.log(filterArray);


//
console.log(process.argv);
// using Yargs: 
const yargs = require('yargs');
var argv = yargs.argv;
var command = argv._[0]; //var command = process.argv[2]; // node app.js add/list/dddd
console.log(command); 

if(command === 'add'){
    notes.addNote(argv.title, argv.body);
} else if(command === 'list'){
    notes.getAll();
}else if(command === 'read'){
    notes.getNote(argv.title);
}else if(command === 'remove'){
    notes.removeNote(argv.title);
}else {
    console.log('Command not recognized');
}