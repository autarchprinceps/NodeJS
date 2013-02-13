var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(function (req, res) {

}).listen(1342);

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
	socket.on
});
