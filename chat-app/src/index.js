const express = require('express');

const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const Filter = require('bad-words');
const generateMessage = require('./utils/messages');
const generatLocation = require('./utils/location');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));

// let count =0 ;

// server (emit) -> client (receive) -countUpdated
// client (emit) -> server (receive) - increment

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({id: socket.id, ...options})

        if(error) {
            return callback(error);
        }

        socket.join(user.room)
        socket.emit('msg', generateMessage('Admin', 'Welcome!'));

        socket.broadcast.to(user.room).emit('msg', generateMessage('Admin', `${user.username} has joined`)); // gui cho tat ca user tru cai hien tai
        callback();
    })
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed.')
        }
        const {user} = getUser(socket.id);
        if(user) {
            io.to(user.room).emit('msg', generateMessage(user.username, message));
            callback();
        }else{
            return callback('err');
        }
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('msg', generateMessage(`${user.username} has left!`));
        }
    });

    socket.on('sendLocation', (coords, callback) => {
        const {user} = getUser(socket.id);
        if(user) {
            io.to(user.room).emit('location', generatLocation(user.username, `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`));
            callback();
        }else{
            return callback('err');
        }
    })
})

server.listen(port, () => {
    console.log('Server is ready');
})