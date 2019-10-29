const express = require('express')
const socket = require('socket.io')
var profanity = require('profanity-util')

// const Utils = require('./model/util.js')
// const Message = require('./model/Message.js')
const Player = require('./model/Player.js')
const PlayerTransform = require('./model/PlayerTransform.js')

// const config = require('./config.json')

const app = express()
const port = process.env.PORT || 7777

app.use(express.static('public'))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const io = socket(server)

const players = {}

setInterval(() => {
  const playerTransforms = {}

  const entries = Object.entries(players)
  for (const [key, value] of entries) {
    playerTransforms[key] = new PlayerTransform({
      x: value.x,
      y: value.y,
      angle: value.angle
    })
  }

  io.sockets.emit('player_transforms', playerTransforms)
}, 33)

io.on('connection', (socket) => {
  socket.on('new_player', (data) => {
    players[socket.id] = new Player({
      x: data.x,
      y: data.y,
      name: data.name
    })

    socket.emit('handshake', socket.id)
    io.sockets.emit('players', players)

    console.log(`${socket.id} joined. (${Object.keys(players).length} players total)`)
  })

  socket.on('player_transform', (data) => {
    const player = players[socket.id]

    if (player !== undefined) {
      player.x = data.x
      player.y = data.y
      player.angle = data.angle
    }
  })

  socket.on('text', (data) => {
    io.sockets.emit('messages', {
      id: socket.id,
      text: profanity.purify(data, 
        {
          replace: true,
          replacementsList: ['meoww', 'meowww', 'meow']
        })[0]
    })
  })

  socket.on('disconnect', () => {
    delete players[socket.id]

    io.sockets.emit('player_disconnected', socket.id)

    console.log(`${socket.id} left. (${Object.keys(players).length} players total)`)
  })
})
