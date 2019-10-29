const CAMERA_HEIGHT = 600
const ZOOM_HEIGHT_MAX = 0 // The smaller the value the 'higher' you can see..
const ZOOM_HEIGHT_MIN = 500 // The larger the value the 'closer' you can see..
const CUTSCENE_STARTING_HEIGHT = 100

const game = new Game()

let tree
let rock

function preload () {
  game.font = loadFont('./fonts/SourceSansPro-Black.otf')
  tree = loadModel('./assets/tree.obj')
  rock = loadModel('./assets/rock.obj')
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

function setup () {
  pixelDensity(2.0) // Default is 2.0
  createCanvas(windowWidth, windowHeight, WEBGL)
  textFont(game.font)
}

function draw () {
  setupPlayer()

  if (game.playing) {
    background(100, 150, 100)

    handleCamera()

    drawPlayer()

    drawPlayers()

    drawReference()

    if (keyIsDown(32) || mouseIsPressed) {
      game.player.attacking = true
    }
  }
}

function keyPressed () {
  if (!game.playing) return

  if (keyCode === ENTER) {
    if (!Chat.isChatFocused() && !Chat.isInputEmpty()) {
      game.socket.emit('text', Chat.getInputText())
      Chat.resetInput()
    }
    Chat.toggle()
  }
}

function setupPlayer () {
  if (game.creatingPlayer) {
    game.player = new Player({
      x: 0,
      y: 0,
      angle: 0,
      size: 25,
      health: 100,
      name: game.playerName,
      client: true
    })

    const url = getURL() // This way we can dynamically switch between localhost and external ips.

    game.socket = io.connect(url, { // Make connection
      reconnect: false,
      autoconnect: false
    })

    game.socket.emit('new_player', {
      x: game.player.x,
      y: game.player.y,
      name: game.player.name
    })

    game.socket.on('connect', function () {
      console.log('Connected: ' + game.socket.connected)
    })

    listener()

    game.creatingPlayer = false
    game.playing = true

    // fullscreen(true) // Set fullscreen on play.
  }
}

function drawPlayer () {
  game.player.draw()
  game.player.handleMovement()
  game.player.handleAttack()
}

function drawPlayers () {
  const players = Object.values(game.players)
  for (const player of players) {
    player.draw()
  }
}

function handleCamera () {
  // Lerp zoom changed by mouse wheel.
  game.currentZoom = lerp(game.currentZoom, game.zoom, 0.02)

  // Lerp scene transition for a smooth effect.
  game.cutSceneDropValue = lerp(game.cutSceneDropValue, CUTSCENE_STARTING_HEIGHT, 0.03)

  const z = CAMERA_HEIGHT - game.currentZoom + CUTSCENE_STARTING_HEIGHT - game.cutSceneDropValue
  camera(game.player.x, game.player.y, z, game.player.x, game.player.y, 0, 0, 1, 0)
}

function drawReference () {
  push()
  translate(0, -450, 0)
  fill(50)
  strokeWeight(1)
  scale(50) // Scale offsets the rock for some reason?
  model(rock)
  pop()

  push()
  stroke(0)

  fill(55, 120, 55)

  scale(50)
  stroke(0, 50, 0)
  strokeWeight(3)

  const spacing = 6
  const amount = 5
  rotateX(HALF_PI)
  for (let x = -amount / 2; x < amount; x++) {
    for (let z = -amount / 2; z < amount; z++) {
      translate(x * spacing, 0, z * spacing)
      fill(55, 120 - (x * 10), 55)
      stroke(0, 50 - (x * 10), 0)
      model(tree)
      translate(-x * spacing, 0, -z * spacing)
    }
  }
  pop()
}

function mouseWheel (event) {
  if (game.zoom <= ZOOM_HEIGHT_MIN && game.zoom >= ZOOM_HEIGHT_MAX) game.zoom -= event.delta
  game.zoom = Math.min(game.zoom, ZOOM_HEIGHT_MIN)
  game.zoom = Math.max(game.zoom, ZOOM_HEIGHT_MAX)
}

function listener () {
  game.socket.on('handshake', function (data) {
    Chat.logChatMessage(`Connected to ${getURL()}`, false)
    game.player.id = data
  })

  game.socket.on('players', function (data) {
    const entries = Object.entries(data)
    for (const [id, player] of entries) {
      if (game.player == null) continue
      if (id === game.player.id) continue
      game.players[id] = new Player(player)
      if (game.firstSetupDone) { Chat.logChatMessage(`Player ${game.players[id].name} has connected`) }
    }
    if (!game.firstSetupDone) { game.firstSetupDone = true }
  })

  game.socket.on('player_transforms', function (data) {
    // The server does not care if the client is not ready for player transforms update.
    // This is why we have to check if the length is 0 in case game.players is not ready.
    if (Object.keys(game.players).length === 0) return

    const entries = Object.entries(data)
    for (const [id, player] of entries) {
      if (game.player == null) continue
      if (id === game.player.id) continue
      const theplayer = game.players[id]
      theplayer.x = player.x
      theplayer.y = player.y
      theplayer.angle = player.angle
    }
  })

  game.socket.on('messages', function (data) {
    if (data.id === game.player.id) {
      Chat.logChatMessage(`${game.player.name}: ${data.text}`, true, true)
      game.player.updateMessage(data.text)
    } else {
      // Should we delete the player at game.players[data.id] here? Or just check if its not undefined??
      if (game.players[data.id] !== undefined) {
        Chat.logChatMessage(`${game.players[data.id].name}: ${data.text}`)
        game.players[data.id].updateMessage(data.text)
      }
    }
  })

  game.socket.on('player_disconnected', function (id) {
    if (game.players[id] !== undefined) { Chat.logChatMessage(`Player ${game.players[id].name} has disconnected`) }

    delete (game.players[id])
  })

  game.socket.on('disconnect', (reason) => {
    // Server closed.
    console.log(reason)
    if (reason === 'transport close') {
      location.reload()
    }
  })
}

setInterval(function () { // This is the client sending data to the server every 33 milliseconds. (Emit ourself (this client) to the server.)
  if (game.sendData) {
    game.sendData = false
    if (game.player) { // Only emit if the client exists.
      game.socket.emit('player_transform', {
        x: game.player.x,
        y: game.player.y,
        angle: game.player.angle
      })
    }
  }
}, 33)
