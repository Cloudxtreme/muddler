var dbf = require('./dbf');
var userfunc = require('./userfunc');

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
	dbf.getSysMes('list', 'none', function(text) {
		var response = {'sender':'server','type':'text','text': text};
		cb(response);
	});
}

function server(socket, params, cb) {
	var online = socket.manager.server.connections;
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

function reg(socket, params, cb) {
	var email = params[0];
	var pass = params[1];

	userfunc.validateEmail(email, function(res) {
		if(res == false) {
			dbf.getSysMes('reg', 'false', function(text) {
				cb({'sender':'server', 'type':'text', 'text':text});
			});
		}
		if(res == true) {
			dbf.createNewAccount(email, pass, function(status) {
				if(status == false) {
					dbf.getSysMes('reg', 'error', function(text) {
						cb({'sender':'server', 'type':'text', 'text':text});
					});
				} else {
					dbf.getSysMes('reg', 'true', function(text) {
						cb({'sender':'server', 'type':'text', 'text':text});
					});
				}
			});
		}
	});
}

exports.parser = parser;