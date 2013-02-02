var net = require('net');

var sockets = [];
var messages = [];

var server = net.createServer(function (socket) {
    sockets.push(socket);
    for (var j = 0; j < messages.length; j++) {
        socket.write(messages[j]);
    }
    socket.on('data', function (data) {
        messages.push(data);
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i] === socket) {
                continue;
            } else {
                sockets[i].write(data);
            }
        }
    });
    socket.on('end', function () {
        var i = sockets.indexOf(socket);
        sockets.splice(i, 1);
    });
}).listen(1342);