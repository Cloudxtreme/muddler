function parser(socket, msg, cb) {
	if(msg.substring(0, 1) == '/') {
		var string = msg.split(' ');
		var command = string[0].substring(1, 100);
		var params = [];
		for(var i=1;i<string.length;i++) {
			params.push(string[i]);
		}
		try {
			var runFunc = eval(command);
			runFunc(socket, params, function(res) {
				cb(res);
			});
		} catch(e) {
			cb(e);
		}

	} else {
		cb('chat message');
	}
}

function list(socket, params, cb) {
	var text = {'sender':'server','type':'text','text': '<b>Список комманд:</b><br><b>/list</b> - эта подсказка.'};
	cb(text);
}

exports.parser = parser;