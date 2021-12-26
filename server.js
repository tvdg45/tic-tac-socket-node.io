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

function forceGC() {

    if (global.gc) {
    	
	global.gc();
    } else {
     	
	console.warn('No GC hook! Start your program as `node --expose-gc server.js`.');
    }
}

io.on('connection', function (client) {

	client.on('start_tic_tac_toe_game', function(data) {
		
		client.emit('start_tic_tac_toe_game', data);
		client.broadcast.emit('start_tic_tac_toe_game', data);
		
		forceGC();
	});
	
	client.on('computer_choose_space', function(data) {
		
		client.emit('computer_choose_space', data);
		client.broadcast.emit('computer_choose_space', data);
		
		forceGC();
	});
});
