const express = require('express');
const socket = require('socket.io');
const http = require('http');

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

    socket.on('disconnect', () => {
        console.log('someone left.') // callback inside separate socket.on disconnection method, notify cmd about disconnected user.
    })

})

// call it as middleware by passing the router dir
app.use(router);

// make the server listen on and tell the cmd on syntaxed PORT (${...})
server.listen(PORT, () =>
    console.log(`Server has started and listening on port ${PORT}`));