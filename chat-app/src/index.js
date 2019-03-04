const express = require('express');

const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const port= process.env.PORT || 3000;
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

    socket.emit('msg', 'Welcome!');

    socket.broadcast.emit('msg', 'A new user has joined'); // gui cho tat ca user tru cai hien tai

    socket.on('sendMessage', (message) => {
        io.emit('msg', message);    
    });

    socket.on('disconnect', () => {
        io.emit('msg', 'The user has left');
    });

    socket.on('sendLocation', (coords) => {
        // io.emit('msg', position);
        // io.emit('msg', `Location with long: ${coords.longitude} and lat: ${coords.latitude}`)
        io.emit('msg', `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
})

server.listen(port, () => {
    console.log('Server is ready');
})