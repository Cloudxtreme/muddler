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

function printMessage(text, sender) {
	var board = document.getElementById('board');
	nowTime(function(time) {
		var html= '<div class="row"><div class="time">'+time+'</div><div class="sender">[<span class="sender_'+sender+'">'+sender+'</span>]:</div>';
		html+= '<span class="message">'+text+'</span>';
		html+= '</div>';
		board.innerHTML+= html;
		board.scrollTop = 9999;
	});
}

function sendMessage(socket) {
	var input = document.getElementById('inp');
	if(input.value != '') {
		printMessage(input.value, 'me');
		socket.send(input.value);
		input.value = ''
	}
}

$(document).ready(function() {

	var socket = io.connect('http://127.0.0.1:3030/');
	socket.on('connect', function() {
		socket.on('message', function(msg) {
			if(msg.type == 'text') {
				printMessage(msg.text, msg.sender);
			}
		});
	});

	$('#inp').keyup(function(e) {
    if(e.keyCode == 13){
			sendMessage(socket);
    }
  });

	$('#but').click(function() {
		sendMessage(socket);
	});

});