require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const {ObjectId} =require('mongodb');
const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const _ = require('lodash');
const {authenticate} = require('./middleware/middleware');

var app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

app.post('/todos', (req, res)=> {
    console.log(req.body);
    var newTodo = new Todo({
        text: req.body.text,
    });
    newTodo.save().then((doc) => {
        console.log('Saved todo,', JSON.stringify(doc, undefined, 2));
        res.send(doc); // neu k co thi post man cu chay mai
    }, (e) => {
        res.status(400).send(e);
        console.log('Unable to save todo', e)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res)=> {
    // res.send(req.params);
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('ID is invalid');
    }
    Todo.findById(id).then(todo => {
        if(!todo){
            return res.status(404).send('Can not found todo ');
        }
        return res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

app.delete('/todos/:id', (req, res)=> {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('ID is invalid');
    }
    Todo.findByIdAndRemove(id).then(todo => {
        if(todo) {
            return res.status(200).send({todo});
        }else {
            return res.status(404).send('Can not found todo');
        }
    }).catch(e => {
        return res.status(400).send();
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)){
        return res.status(404).send('ID is invalid');
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,
        {
            $set: body
        }, {
            new: true
        }).then(todo => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        }).catch(e => {
            res.status(400).send();
        })
})

app.post('/users', (req, res) => {
    // const user = new User({
    //     email: 'tina@enclave.vn',
    //     password: 'tina123456'
    // })
    const body = _.pick(req.body, ['email', 'password']); // pick from post man
    const user = new User(body);

    user.save().then(user => {
        console.log(user);
        return user.generateAuthToken();
    }).then(token => {
        console.log(token);
        res.header('x-auth', token).send(user);
    }).catch(e => {
        res.status(400).send(e);
        console.log('Unable to save user: ', e);
    })
});

app.get('/users/me', authenticate,  (req, res)=>{
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then(user => {
        res.send(user);
    }).catch(e => {
        res.status(400).send();
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app};