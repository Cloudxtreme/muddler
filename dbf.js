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

function getSysMes(command, params, cb) {
	db.collection('messages', function(err, collection) {
		collection.findOne({type:'system', command: command, params: params}, function(err,doc) {
			cb(doc.text);
		});
	});
}

function createNewAccount(email, pass, cb) {
	db.collection('accounts', function(err, collection) {
		collection.findOne({"email":email}, function(err,doc) {
			if(doc != null) {
				cb(false);
			} else {
				collection.insert({"email": email, "pass":pass});
				cb(true);
			}
		});
	});
}

mongoConnect();
exports.getSysMes = getSysMes;
exports.createNewAccount = createNewAccount;