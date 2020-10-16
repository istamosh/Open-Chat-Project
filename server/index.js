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

// connection event function sector
ioserver.on('connection', (socket) => {
    console.log('someone had connected.') // callback of connected user notification

    socket.on('join', ({ name, room }, callback) => { // send back callback parameter value to clients' specific event emitter
        // getting either error or user value when trying to adding new user by constructing socket-generated id, name, and room
        const { error, user } = addUser({ id: socket.id, name, room });

        // emit message event TO USER by usertype admin and their text is calling that name and welcoming room name
        // these emit events below are happens from the backend to the frontend
        socket.emit('message', { //payload below
            user: 'admin',
            text: `${user.name}, welcome to room ${user.room}`
        })
        // emit broadcast message by message event to all users (excluding joining user) in that room by admin
        socket.broadcast.to(user.room).emit('message', { //payload below
            user: 'admin',
            text: `${user.name} came in.`
        })

        // if getting an error, quit from this function block while passing the error callback msg
        if (error) return callback(error);

        // if not, join the said room by user request
        socket.join(user.room);
        // positive callback when no error is occured
        callback();
    })

    // expect send-message event from user using their ID and emit those message event containing a payload of users' name and their message text informations
    // then callback this function to frontend
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {
            user: user.name,
            text: message
        })
        callback();
    })

    socket.on('disconnect', () => {
        console.log('someone left.') // callback inside separate socket.on disconnection method, notify cmd about disconnected user.
    })

})

// call it as middleware by passing the router dir
app.use(router);

// make the server listen on and tell the cmd on syntaxed PORT (${...})
server.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`));