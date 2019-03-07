const socket = io();

// socket.on('countUpdated' , (count) => { // client listen event using on()
//     console.log('The count has been updated', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment');
// })

// Elements
const $form = document.querySelector('#message_form');
const $inputMessage = document.querySelector('#message');
const $buttonSubmit = document.querySelector('button');
const $location = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $location_show = document.querySelector('#location_show');
const $sidebar = document.querySelector('#sidebar');

// Templates
const messageTemplates = document.querySelector('#message_template').innerHTML;
const locationTemplates = document.querySelector('#location_template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar_template').innerHTML;

// Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('msg', (msg) => {
    // console.log('msg: ', msg);
    const html = Mustache.render(messageTemplates, {username: msg.username, msg: msg.text, createAt: moment(msg.createAt).format('h: mm a - DD/MM/YYYY')});
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('location', (location) => {
    const html = Mustache.render(locationTemplates, {username: location.username, url: location.url, createAt: moment(location.createAt).format('h: mm a - DD/MM/YYYY')})
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {room, users});
    $sidebar.innerHTML = html; // override lai
    // $sidebar.insertAdjacentHTML('beforeend', html); // load lai cai moi
    console.log(room, users);
})

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    $buttonSubmit.setAttribute('disabled', 'disabled');
    let message = $inputMessage.value;
    // console.log(message);
    socket.emit("sendMessage", message, (err) => {
        $inputMessage.value = '';
        $inputMessage.focus();
        $buttonSubmit.removeAttribute('disabled');
        if(err){
            return console.log(err);
        }
        console.log('The message was delivered: ');
    });
});

$location.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported on your browser');
    }
    $location.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('send');
        socket.emit('sendLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        }, () => {
            $location.removeAttribute('disabled');
            console.log('The location is shared.')
        });
    })
});

socket.emit('join', {username, room}, (err) => {
    if(err) {
        alert(err);
        location.href = '/'
    }
})