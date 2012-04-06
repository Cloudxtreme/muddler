var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.all('/muddler.css', function(req, res) {
  res.sendfile('frontend/muddler.css');
});
app.all('/muddler.js', function(req, res) {
  res.sendfile('frontend/muddler.js');
});

io.sockets.on('connection', function (socket) {
  socket.json.send({'event': 'connected', 'name': socket.id});

  socket.on('message', function (msg) {
    console.log(msg);
    socket.json.send({'event':'ok'});
  });

  socket.on('disconnect', function() {
    io.sockets.json.send({'1':'2'});
  });

});

app.listen(3030, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
