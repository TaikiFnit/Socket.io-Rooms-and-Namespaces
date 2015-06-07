function Socket(server) {

	io = require('socket.io')(server);

	var index = io.of('/');
	var match = io.of('/match');
	var scoreCard = io.of('/scoreCard');

	io.sockets.on('connection', function(socket) {
		console.log(socket['id'] + 'has connected');

		socket.emit('fnit', {'msg': 'hello fnit'});

		socket.on('join', function(data) {
			socket.join('room' + data.id);	
			io.to('room' + data.id).emit('fnit', { msg: socket.id + 'has joined to room' + data.id })
		});

 		socket.on('leave', function(data) {
 			socket.leave('room' + data.id);
 			io.to('room' + data.id).emit('fnit', {msg: socket.id + 'has leaved from room' + data.id});
 		});

		socket.on('emit', function(data) {
			io.to('room' + data.id).emit('fnit', {msg: data.msg});
		});
	});

	index.on('connection', function(socket) {
		index.on('join', function(data) {
			socket.join('room' + data.id);	
			index.in('room' + data.id).emit('fnit', { msg: socket.id + 'has joined to room' + data.id })
		});

 		index.on('leave', function(data) {
 			socket.leave('room' + data.id);
 			index.in('room' + data.id).emit('fnit', {msg: socket.id + 'has leaved from room' + data.id});
 		});

		index.on('emit', function(data) {
			index.to('room' + data.id).emit('fnit', {msg: data.msg});
		});
	});

	match.on('connection', function(socket) {
		socket.emit('fnit', {msg: 'We are now in match'});

		socket.on('join', function(data) {
			socket.join('room' + data.id);	
			match.in('room' + data.id).emit('fnit', { msg: socket.id + 'has joined to room' + data.id })
		});

 		socket.on('leave', function(data) {
 			socket.leave('room' + data.id);
 			match.in('room' + data.id).emit('fnit', {msg: socket.id + 'has leaved from room' + data.id});
 		});

		socket.on('emit', function(data) {
			match.in('room' + data.id).emit('fnit', {msg: data.msg});
		});

	});
	
	scoreCard.on('connection', function(socket) {
		socket.emit('fnit', {msg: 'We are now in scoreCard'});

		socket.on('join', function(data) {
			console.log('scoreCard.on join');
			socket.join('room' + data.id);	
			scoreCard.in('room' + data.id).emit('fnit', { msg: socket.id + 'has joined to room' + data.id })
		});

 		scoreCard.on('leave', function(data) {
 			socket.leave('room' + data.id);
 			socket.in('room' + data.id).emit('fnit', {msg: socket.id + 'has leaved from room' + data.id});
 		});

		scoreCard.on('emit', function(data) {
			scoreCard.in('room' + data.id).emit('fnit', {msg: data.msg});
		});

	});

};

module.exports = Socket;
