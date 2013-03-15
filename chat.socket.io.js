var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.configure(function () {
    app.set('view engine', 'jade');
    app.set('views', __dirname);
    app.use(express.static(__dirname));
});

app.get('/', function (req, res) {
    res.render("chat.jade");
});

server.listen(1337);

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
    socket.set('nickname', 'Unnamed User');
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
