const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');

// import modules from userManager.js
const { addUser, removeUser, getUser, getUsersInRoom } = require('./userManager.js');

// define the router directory
const router = require('./router');

const app = express();
const server = http.createServer(app);
const ioserver = socket(server);

// call it as middleware by passing the router dir
app.use(router);
// use cors for deployment
app.use(cors());

// code scope below listens to socket type-connection event
ioserver.on('connection', (socket) => {
    //console.log('someone had connected.'); // callback of connected user notification

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
        // join into room
        socket.join(user.room);
        //test
        console.log(`${user.name}#${user.id} had connected in ${user.room}.`);
        // emit roomData property that consist of name and all logged users to all users in that said room
        ioserver.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        //test
        const userList = getUsersInRoom(user.room);
        console.log(`There are ${userList.length} user(s) inside room ${user.room}, contains:`)
        for (var key in userList) {
            if (userList.hasOwnProperty(key)) {
                var value = userList[key];
                console.log(`${value.name}`);
            }
        };
        
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
        //test message snooper
        console.log(`${user.name} says ${message}`);
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
        console.log(`${user.name} disconnected from ${user.room}.`);
    });
});
const serverPort = 5000;
// make the server listen on and tell the cmd on syntaxed PORT (${...})
server.listen(process.env.PORT || serverPort, () =>
    console.log(`Server has started and listening on port ${serverPort}`));