var socket = io('http://localhost:3000');

socket.on('fnit', function(data) {
$('#chatArea').append(data.msg + '<br>');
  console.log(data);
  console.log(data.msg);
});

function join() {
	socket.emit('join', {id: $('#joinId').val()})
}

function leave() {
	socket.emit('leave', {id: $('#leaveId').val()})
}

function emit() {
	socket.emit('emit', {id: $('#emitId').val(), msg: $('#emitMsg').val()});
}
