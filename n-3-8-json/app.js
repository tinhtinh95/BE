console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  decribe: ' Body of note',
  demand: true,
  alias: 'b'
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read info of the note', {
    title: titleOptions
  })
  .command('remove', 'Remove a new note', {
    title: titleOptions
  })
  .help()
  .alias('help', 'h')
  .argv;
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
  var noteArray = notes.getAll();
  console.log(`There are ${noteArray.length} notes: `);
  noteArray.forEach(element => {
    console.log(element);
  });
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
