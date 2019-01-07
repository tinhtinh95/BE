const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

var id = '5c2e32b0894ac721bf0fa928';

if(!ObjectID.isValid(id)){
    console.log('ID is invalid');
}

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log('Todos: ', todos)
// });

// Todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log('Todo: ',todo);
// });

Todo.findById(id).then(todo => {
    if(!todo) {
        console.log('Id not found');
    } else{
        console.log('Todo By ID: ', todo);
    }
}).catch(e => console.log(e))