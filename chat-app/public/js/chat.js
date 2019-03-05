const socket = io();

// socket.on('countUpdated' , (count) => { // client listen event using on()
//     console.log('The count has been updated', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment');
// })

socket.on('msg', (msg) => {
    console.log('msg: ', msg);
});

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    let message = document.querySelector('#message').value;
    // console.log(message);
    socket.emit("sendMessage", message, (err) => {
        if(err){
            return console.log(err);
        }
        console.log('The message was delivered: ');
    });
});

document.querySelector('#location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported on your browser');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        socket.emit('sendLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        }, () => {
            console.log('The location is shared.')
        });
    })
})