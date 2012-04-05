function nowTime(cb) {
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	if(hour < 10) { hour = '0' + hour; }
	if(min < 10) { min = '0' + min;	}
	if(sec < 10) { sec = '0' + sec;}
	cb('['+ hour + ':'+ min + ':' + sec + ']');
}

function sendMessage(socket) {
	var board = document.getElementById('board');
	var input = document.getElementById('inp');
	nowTime(function(time) {
			var html= '<div class="row"><div class="time">'+time+'</div><div class="sender">[<span class="sender_name">me</span>]:</div>';
			html+= '<span class="message">'+input.value+'</span>';
			html+= '</div>';
			board.innerHTML+= html;
			board.scrollTop = 9999;
			socket.on('server', function (data) {
				console.log('a');
    		console.log(data);
    		socket.emit('my other event', { my: 'data' });
  		});
			input.value = ''
	});
}

$(document).ready(function() {

	var socket = io.connect('http://127.0.0.1:3030/');

	$('#inp').keyup(function(e) {
    if(e.keyCode == 13){
			sendMessage(socket);
    }
  });

	$('#but').click(function() {
		sendMessage(socket);
	});

});