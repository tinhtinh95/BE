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

let count =0 ;

// server (emit) -> client (receive) -countUpdated
// client (emit) -> server (receive) - increment

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('countUpdated', count); // emit event for client

    socket.on('increment', () => {
        count++;
        // socket.emit('countUpdated', count);
        io.emit('countUpdated', count); // realtime if open two browser
    })
})

server.listen(port, () => {
    console.log('Server is ready');
})