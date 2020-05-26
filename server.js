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

	client.on('refresh_cart_window', function(data) {
		
		client.emit('refresh_cart_window', data);
		client.broadcast.emit('refresh_cart_window', data);
		
		forceGC();
	});
	
	client.on('cron_refresh_cart_window', function(data) {
		
		client.emit('cron_refresh_cart_window', data);
		client.broadcast.emit('cron_refresh_cart_window', data);
		
		forceGC();
	});
});
