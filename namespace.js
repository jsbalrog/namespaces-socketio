var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
	socket.on('join', function(data) {
		socket.username = data.username;
		socket.broadcast.emit('join', { username: data.username, socket: socket.id  });
	});
})