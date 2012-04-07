var db;

function mongoConnect() {
	var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server('127.0.0.1', 27017, ''),
    db_connector = new mongodb.Db('muddler', mongoserver, '');

	db_connector.open(function(err, dbs) {
		db = dbs;
	});
}

mongoConnect();

function getMessageTypeList(cb) {
	db.collection('messages', function(err, collection) {
		collection.distinct('type', function(err,doc) {
			cb({'messageTypeList': doc});
		});
	});
}

function getMessages(type, cb) {
	db.collection('messages', function(err, collection) {
		collection.find({"type": type} ,function(err, doc) {
			var response = [];
			doc.toArray(function(err, items) {
				cb({'messages': items});
			});
		});
	});
}

function editor(req, res) {

	if(req.query.action == 'getMessageTypeList') {
		getMessageTypeList(function(data) {
			res.end('_cb(' + JSON.stringify(data) + ');');
		});
	}

	if(req.query.action == 'getMessages') {
		getMessages(req.query.type, function(data) {
			res.end('_cb(' + JSON.stringify(data) + ');');
		});
	}
}

exports.editor = editor;