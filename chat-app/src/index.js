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

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));

// let count =0 ;

// server (emit) -> client (receive) -countUpdated
// client (emit) -> server (receive) - increment

io.on('connection', (socket) => {
    console.log('New websocket connection');

    // socket.emit('countUpdated', count); // emit event for client

    // socket.on('increment', () => {
    //     count++;
    //     // socket.emit('countUpdated', count);
    //     io.emit('countUpdated', count); // realtime if open two browser
    // })

    socket.on('join', ({ username, room }) => {
        socket.join(room)
        socket.emit('msg', generateMessage('Welcome!'));

        socket.broadcast.to(room).emit('msg', generateMessage(`${username} has joined`)); // gui cho tat ca user tru cai hien tai
    })
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed.')
        }
        io.emit('msg', generateMessage(message));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('msg', generateMessage('The user has left'));
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('location', generatLocation(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    })
})

server.listen(port, () => {
    console.log('Server is ready');
})