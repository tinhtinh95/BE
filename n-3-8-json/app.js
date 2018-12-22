console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if(note) {
    console.log(`You have added note with title="${argv.title}" and body ="${argv.body}"`);
  } else {
    console.log('This note is already added.');
  }
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  var message = note ? `Info the note: title="${note.title}" and body="${note.body}"` 
  : notes.logNotFoundNote(argv.title);
  console.log(message);
} else if (command === 'remove') {
  var checkIsRemoved = notes.removeNote(argv.title);
  var message = checkIsRemoved ? 'Note was removed.' : notes.logNotFoundNote(argv.title);
  console.log(message);
} else {
  console.log('Command not recognized');
}
