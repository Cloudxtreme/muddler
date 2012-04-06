var db;

function mongoConnect() {
	var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server('127.0.0.1', 27017, ''),
    db_connector = new mongodb.Db('muddler', mongoserver, '');

	db_connector.open(function(err, dbs) {
		db = dbs;
	});
}

// Game Functions:

function getSysMes(command, cb) {
	db.collection('messages', function(err, collection) {
		collection.findOne({type:'system', command:'list'}, function(err,doc) {
			cb(doc.text);
		});
	});
}

mongoConnect();
exports.getSysMes = getSysMes;