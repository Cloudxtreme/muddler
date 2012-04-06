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
	var text = {'sender':'server','type':'text','text': '<b>Список комманд:</b><br><b>/list</b> - эта подсказка.<br><b>/server</b> - информация о сервере.'};
	cb(text);
}

function server(socket, params, cb) {
	var online = socket.manager.server.connections - 1;
	var uptime = {};
	uptime.all = Math.floor(process.uptime());
	var date = new Date();
	date.setTime(uptime.all * 1000);
	uptime.min = date.getUTCMinutes();
		if(uptime.min < 10) { uptime.min = '0'+uptime.min; }
	uptime.sec = date.getUTCSeconds();
		if(uptime.sec < 10) { uptime.sec = '0'+uptime.sec; }
	uptime.hour = date.getUTCHours();
		if(uptime.hour < 10) { uptime.hour = '0'+uptime.hour; }

	var response = {'sender': 'server', 'type': 'text', 'text':'<b>Информация о сервере:</b><br>Пользователей он-лайн: <b>' + online + '</b><br>Сервер работает: <b>'+uptime.hour+':'+uptime.min+':'+uptime.sec+'</b>'};
	cb(response);
}

exports.parser = parser;