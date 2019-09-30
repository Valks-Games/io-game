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
const Utils = require('./classes/utils.js');
const Player = require('./classes/player.js');
const PlayerTransform = require('./classes/playertransform.js');

let players = {};

setInterval(() => {
  let player_transforms = {};

  const entries = Object.entries(players);
  for (const [key, value] of entries) {
    player_transforms[key] = new PlayerTransform({
      x: value.x,
      y: value.y,
      angle: value.angle
    });
  }

  io.sockets.emit('player_transforms', player_transforms);
}, 33);

io.on('connection', (socket) => {
  socket.on('new_player', (data) => {
    players[socket.id] = new Player({
      x: data.x,
      y: data.y,
      name: data.name
    });

    // socket.emit sends to ONE client.
    socket.emit('handshake', socket.id); // So the client can tell what id they are..

    // io.sockets.emit sends to ALL clients.
    io.sockets.emit('players', players);

    console.log(`${socket.id} joined. (${Object.keys(players).length} players total)`);
  });

  socket.on('player_transform', (data) => {
    let player = players[socket.id];

    if (player != undefined) {
      player.x = data.x;
      player.y = data.y;
      player.angle = data.angle;
    }
  });

  socket.on('disconnect', () => {
    // Remove the player that disconnected from the array of players.
    delete players[socket.id];

    io.sockets.emit('player_disconnected', socket.id);

    console.log(`${socket.id} left. (${Object.keys(players).length} players total)`)
  });
});