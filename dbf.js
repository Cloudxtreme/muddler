var pg;

function pgConnect() {
	var pgc = require('pg');
	pgc.connect('tcp://muddler:muddler@localhost/muddler', function(err, client) {
		pg = client;
	});
}

pgConnect();

function getSysMes(command, params, cb) {
	pg.query('SELECT text FROM messages_system WHERE command = \''+command+'\' AND params = \''+params+'\' AND lang = \'ru\';', function(err, res) {
		console.log(err ,res);
		cb(res.rows[0].text);
	});
}

function createNewAccount(email, pass, cb) {
	pg.query('INSERT INTO accounts(email, password, character) VALUES (\''+email+'\',\''+pass+'\', DEFAULT);', function(err, res) {
		if (err) {
			cb(false);
		}	else {
			cb(true);
		}
	});
}

exports.getSysMes = getSysMes;
exports.createNewAccount = createNewAccount;