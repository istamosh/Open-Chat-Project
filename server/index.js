const express = require('express');
const socket = require('socket.io');
const http = require('http');

// import modules from userManager.js
const { addUser, removeUser, getUser, getUsersInRoom } = require('./userManager.js');

// defining the listening port
const PORT = 5000 || process.env.PORT;

// define the router directory
const router = require('./router');

const app = express();
const server = http.createServer(app);
const ioserver = socket(server);

// test
//let users = new getUsersInRoom();

// code scope below listens to socket type-connection event
ioserver.on('connection', (socket) => {
    console.log('someone had connected.'); // callback of connected user notification

    // send back callback parameter value to clients' specific event emitter
    socket.on('join', ({ name, room }, callback) => {
        // getting either error or user value when trying to adding new user by constructing socket-generated id, name, and room
        const { error, user } = addUser({ id: socket.id, name, room });

        // if getting an error, quit from this function block while passing the error callback msg
        if (error)
            return callback(error);

        // emit message event TO USER by usertype admin and their text is calling that name and welcoming room name
        // these emit events below are happens from the backend to the frontend
        socket.emit('message', { //payload below
            user: 'admin',
            text: `${user.name}, welcome to room ${user.room}`
        });
        // emit broadcast message by message event to all users (excluding joining user) in that room by admin
        socket.broadcast.to(user.room).emit('message', { //payload below
            user: 'admin',
            text: `${user.name} came in.`
        });

        // if not, join the said room by user request
        socket.join(user.room);
        // emit roomData property that consist of name and all logged users to all users in that said room
        ioserver.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        // positive callback when no error is occured
        callback();
    });

    // expect send-message event from user using their ID and emit those message event containing a payload of users' name and their message text informations
    // then callback this function to frontend
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        ioserver.to(user.room).emit('message', {
            user: user.name,
            text: message
        });

        callback();
    });

    // when user disconnects, remove their ID from socket and tell everyone using admin name in respective room that user just left
    // the sequence will be: dc, user left, reconnect, connect, user join, greeted.
    // also emit roomData on disconnect event
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        ioserver.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has left.`
        });
        ioserver.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

    });
});

// call it as middleware by passing the router dir
app.use(router);

// make the server listen on and tell the cmd on syntaxed PORT (${...})
server.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`));