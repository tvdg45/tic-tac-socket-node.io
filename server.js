'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 1000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (client) {
	
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
