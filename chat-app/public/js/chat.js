const socket = io();

socket.on('countUpdated' , (count) => { // client listen event using on()
    console.log('The count has been updated', count);
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked');
    socket.emit('increment');
})