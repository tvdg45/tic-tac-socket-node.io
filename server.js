'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  
	client.on('load_threads', function(data) {
		
		client.emit('load_threads', data);
		client.broadcast.emit('load_threads', data);
	});
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
