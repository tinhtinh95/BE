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
    console.log(message);
    socket.emit("sendMessage", message);
})