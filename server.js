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

	client.on('refresh_admin_window', function(data) {
		
		client.emit('refresh_admin_window', data);
		client.broadcast.emit('refresh_admin_window', data);
	});
	
	client.on('log_other_users_out', function(data) {
		
		client.emit('log_other_users_out', data);
		client.broadcast.emit('log_other_users_out', data);
	});
	
	client.on('load_threads', function(data) {
		
		client.emit('load_threads', data);
		client.broadcast.emit('load_threads', data);
	});
});
