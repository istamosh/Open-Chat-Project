const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8')

const httpServer = require('http').createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(content))
    res.end(content)
})

const io = require('socket.io')(httpServer)

io.on('connect', socket => {
    console.log('connect')
})

httpServer.listen(3000, () => {
    console.log('listening on localhost:3000')
})