var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); //this is for display

io.on('connection', (socket) => {
    console.log('an user has connected.');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg); //copies the sent message to console

        io.emit('chat message', msg); //emit the sent message into index.html message appender
    }); //copies user message content to console

    socket.on('disconnect', () => {
        console.log('user dc.');
    });
}); //socket io notify server about connected and disconnected client

http.listen(3000, () => {
    console.log('listening on *:3000');
}); //for port settings and console