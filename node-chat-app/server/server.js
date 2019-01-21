const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);
// vi thu muc public va server khac nhau nen dung path de goi den thu muc public

let app = express();
let server = http.createServer(app);
let io = socketIO(server); 

app.use(express.static(publicPath));

io.on('connection', (socket) => { // register event when event happened, client connected to server, socket argument is the same as index.html
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User was disconnected'); // when close client
    })
});

server.listen(port, () => {
    console.log(`Server is ready at port: ${port}`);
})

