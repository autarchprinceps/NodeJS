var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/chat.html');
});

var sockets = [];
var messages = [];

io.sockets.on('connection', function (socket) {
    socket.emit('put', {
        Name: 'System',
        Message: 'Welcome'
    });
    sockets.push(socket);
    for (var j = 0; j < messages.length; j++) {
        socket.emit('put', messages[j]);
    }
    socket.on('send', function (data) {
        socket.set('nickname', data.Name);
        messages.push(data);
        for (var i = 0; i < sockets.length; i++) {
            sockets[i].emit('put', data);
        }
    });
    socket.on('disconnect', function () {
        socket.get('nickname', function (err, name) {
            var data = {
                Name: 'System',
                Message: name + " has left the chat"
                }
            messages.push(data);
            for (var i = 0; i < sockets.length; i++) {
                sockets[i].emit('put', data);
            }
        });
        sockets.splice(sockets.indexOf(socket), 1);
    });
});