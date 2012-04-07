function getDataFromServer(data, cb) {
	$.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3030/editor',
    dataType: 'jsonp',
    jsonpCallback: "_cb",
    data: data,
    success: function(data) {
    	cb(data);
    }
  });
}

function getMessages(obj) {
 	var content = document.getElementById('content');
	var type = obj.attr('id');
	type = type.split('_');
	type = type[2];
	getDataFromServer({'action': 'getMessages', 'type': type}, function(data) {
	content.innerHTML = '';
	var html = '<center><table border="1">';
	html+= '<th>Type</th><th>Command</th><th>Params</th><th>Lang</th><th>Text</th>';
		var messages = $.makeArray(data.messages);
		for(var i=0;i<messages.length;i++) {
			//if(messages[i] != null) {
				html+= '<tr><td>'+data.messages[i].type+'</td><td>'+data.messages[i].command+'</td><td>'+data.messages[i].params+'</td><td>'+data.messages[i].lang+'</td><td>'+data.messages[i].text+'</td>';
			//}
		}
	html+= '</table></center>';
	content.innerHTML = html;
  });
}

$(document).ready(function() {

	$('#menu_messages').click(function() {
	 	var content = document.getElementById('content');
		getDataFromServer({'action': 'getMessageTypeList'}, function(data) {
     	var content = document.getElementById('content');
     	var listArr = data.messageTypeList;
     	var html = '';
     	for(var i=0;i<listArr.length;i++) {
     		html+= '<span class="menu_button" id="menu_messages_'+listArr[i]+'">'+listArr[i]+'</span>';
     	}
     	content.innerHTML = html;
     	$('.menu_button').click(function() {
     		getMessages($(this));
     	});
     });
    });

});