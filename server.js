var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use((req, res, next) => {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	
	next();
});

app.get('/', function(req, res, next) {
	
	res.sendFile(__dirname + '/index.html')
});

app.use(express.static('public'));

io.on('connection', function(client) {
	
	client.on('load_threads', function(data) {
		
		client.emit('load_threads', data);
		client.broadcast.emit('load_threads', data);
	});

  	client.on('change_threads', function(data) {
		
  		client.emit('change_threads', data);
  		client.broadcast.emit('change_threads', data);
  	});
	
  	client.on('erase_threads', function(data) {
		
  		client.emit('erase_threads', data);
  		client.broadcast.emit('erase_threads', data);
  	});
	
	client.on('create_threads', function(data) {
		
		client.emit('create_threads', data);
		client.broadcast.emit('create_threads', data);
	});
});

server.listen(1000);
