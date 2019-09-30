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

// Classes
const Player = require('./classes/player.js');

let players = [];

setInterval(() => {

}, 33);

io.on('connection', (socket) => {
  socket.on('new_player', (data) => {
	const player = new Player({
		id: socket.id,
		x: data.x,
		y: data.y,
		name: data.name
	});

    players.push(player);

    // io.sockets.emit sends to ALL clients.
    io.sockets.emit('players', players);

    // socket.emit sends to ONE client.
    socket.emit('handshake', socket.id); // So the client can tell what id they are..

    console.log(`${socket.id} joined. (${players.length} players total)`);
  });

  socket.on('disconnect', () => {
    // Find the player that disconnected and remove them from the array of players.
    for (const player of players) {
		if (player.id != socket.id) continue;
		const index = players.indexOf(player);
		players.splice(index, 1);
		break;
    }

    io.sockets.emit('players', players);

    console.log(`${socket.id} left. (${players.length} players total)`)
  });
});