var net = require('net');

var sockets = [];
var messages = [];

var server = net.createServer(function (socket) {
    sockets.push(socket);
	var firstrun = true;
	socket.write("Wie lautet dein Name?\n");
	var name = "un";
    socket.on('data', function (data) {
		if (firstrun) {
			var i = data.toString().indexOf("\n");
			name = data.toString().slice(0, i);
			for (var j = 0; j < messages.length; j++) {
		        socket.write(messages[j]);
		    }
			firstrun = false;
			return;
		}
        messages.push(name + ": " + data);
        for (var i = 0; i < sockets.length; i++) {
            if (sockets[i] === socket) {
                continue;
            } else {
                sockets[i].write(name + ": " + data);
            }
        }
    });
    socket.on('end', function () {
        var i = sockets.indexOf(socket);
        sockets.splice(i, 1);
    });
}).listen(1342);
