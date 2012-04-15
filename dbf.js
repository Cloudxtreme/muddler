var pg;

function pgConnect() {
	var pgc = require('pg');
	pgc.connect('tcp://muddler:muddler@localhost/muddler', function(err, client) {
		pg = client;
	});
}

pgConnect();

function getSysMes(command, params, cb) {
	pg.query('SELECT text FROM messages_system WHERE command = \'list\';', function(err, res) {
		cb(res.rows[0].text);
	});
}

function createNewAccount(email, pass, cb) {

}

exports.getSysMes = getSysMes;
exports.createNewAccount = createNewAccount;