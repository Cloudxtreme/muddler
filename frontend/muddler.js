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

function sendMessage() {
	var board = document.getElementById('board');
		var input = document.getElementById('inp');
		nowTime(function(time) {
			var html= '<div class="row"><div class="time">'+time+'</div><div class="sender">[<span class="sender_name">me</span>]:</div>';
			html+= '<span class="message">'+input.value+'</span>';
			html+= '</div>';
			board.innerHTML+= html;
			board.scrollTop = 9999;
			input.value = '';
		});
}

$(document).ready(function() {

	$('#inp').keyup(function(e) {
    if(e.keyCode == 13){
 			sendMessage(); 
    }
  });

	$('#but').click(function() {
		sendMessage();
	});

});