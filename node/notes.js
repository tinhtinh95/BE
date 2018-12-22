console.log('Notes.js');
// module.exports.age = 15;

// module.exports.add = (a,b) => {
//     return a+b;
// }

var addNote = (title, body) => {
    console.log('Adding note', title, body);
};

var getAll = () =>{
    console.log('Getting all notes:');
}

var getNote = (title) =>{
    console.log('Getting note', title);
}

var removeNote =(title)=>{
    console.log('Remove note: ', title);
}

module.exports ={
    addNote,
    getAll,
    getNote,
    removeNote
}