const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room) {
        return {
            error: "Username and room are required!"
        }
    }
    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    // validate username
    if(existingUser) {
        return {
            error: "Username is in use."
        }
    }
    const user = { id, username, room }
    users.push(user);
    return { user };
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1) {
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id);
    if(user) {
        return { user }
    }else {
        return null;
    }
}

const getUsersInRoom = (roomName) => {
    const usersInRoom = users.filter(user => user.room === roomName);
    if(usersInRoom.length === 0){
        return [];
    }else{
        return usersInRoom;
    }
}

// addUser({
//     id: 24,
//     username: 'Tina',
//     room: "Room A"
// });
// addUser({
//     id: 24,
//     username: 'Tinh',
//     room: "Room A"
// })

// console.log(getUsersInRoom('room b'));
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
