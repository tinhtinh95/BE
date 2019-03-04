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

io.on('connection', () => {
    console.log('New websocket connection');
})

server.listen(port, () => {
    console.log('Server is ready');
})