const socket = io();
socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'tinhtinh@example.com',
        text: 'Hey, Tina is here.'
    }) // co the emit from browser
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newEmail', (email) => {
    console.log('New email: ', email)
})