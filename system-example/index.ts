var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); //this is for display

io.on('connection', (socket) => {
    console.log('an user has connected.');
}) //socket io notify server about connected client

http.listen(3000, () => {
    console.log('listening on *:3000');
}); //for port settings and console