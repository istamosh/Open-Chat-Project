var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); //this is for display

http.listen(3000, () => {
    console.log('listening on *:3000');
}); //for port settings and console