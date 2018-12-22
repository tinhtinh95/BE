console.log('Starting notes.js');

const fs = require('fs');
const _ = require('lodash');

var fetchNotes = () => {
  try{ // avoid note-data.json is not exists
    var noteString = fs.readFileSync('note-data.json');
    return JSON.parse(noteString); 
  }catch(e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('note-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  console.log(`Adding note with title="${title}" and body="${body}" ...`);
  var notes = fetchNotes();
  var note= {
    title,
    body
  }
  var duplicateNotes = notes.filter((note) => note.title === title);
  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
  return fetchNotes();
};

var getNote = (title) => {
  console.log(`You are reading information of the note with title="${title}" ...`);
  var notes = fetchNotes();
  var note = _.find(notes, function(note) {
    return note.title === title;
  })
  return note;
};

var removeNote = (title) => {
  console.log(`You are removing the note with title="${title}" ...`);
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => note.title !== title);
  saveNotes(newNotes);
  return notes.length !== newNotes.length;
};

var logNotFoundNote = (title) => {
  return `The note with title="${title}" is not found`;
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNotFoundNote
};
