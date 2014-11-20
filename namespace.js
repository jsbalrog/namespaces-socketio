var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
	socket.on('join', function(data) {
		socket.username = data.username;
		socket.broadcast.emit('join', { username: data.username, socket: socket.id });
	});

	socket.on('ping', function() {
		socket.broadcast.emit('ping', { username: socket.username });
	});

	socket.on('privatePing', function(data) {
		// io.sockets.connected has all the connected sockets.
		//The data.socket object contains the socket id.
		io.sockets.connected[data.socket].emit('ping',
			{ username: socket.username, priv: true });
	});
});