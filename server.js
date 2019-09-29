const express = require('express');
const socket = require('socket.io');
const config = require('./config.json');

// App setup
const app = express();
const server = app.listen(7777, () => {
  console.log('Server is running on port 7777');
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server); // Waiting for client. Listen out for when the connection is made..

let clients = [];

setInterval(() => {
	
}, 33);

io.on('connection', (socket) => {
	clients.push(socket.id);
	console.log(`A client with id "${socket.id}" connected. (${clients.length} clients total)`);
	
	socket.on('disconnect', () => {
		
	});
});