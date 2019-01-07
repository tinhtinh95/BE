const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {ObjectID} = require('mongodb');

// Todo.remove({}).then(result => {
//     console.log(result);
// });

Todo.findByIdAndRemove('5c337a4780d7fb6f9365040e')
    .then(todo => {
        console.log(todo);
    })