const CAMERA_HEIGHT = 10
const ZOOM_HEIGHT_MAX = -3 // The smaller the value the 'higher' you can see..
const ZOOM_HEIGHT_MIN = 6 // The larger the value the 'closer' you can see..
const CUTSCENE_STARTING_HEIGHT = 50

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer(
  {
    antilias: true
  })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


const game = new Game()

animate()

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('keydown', onKeyDown)
window.addEventListener('keyup', onKeyUp)
window.addEventListener('wheel', onMouseScroll)

function onMouseScroll(e) {
  if (game.zoom <= ZOOM_HEIGHT_MIN && game.zoom >= ZOOM_HEIGHT_MAX) game.zoom -= e.deltaY / 250 / 1.5
  game.zoom = Math.min(game.zoom, ZOOM_HEIGHT_MIN)
  game.zoom = Math.max(game.zoom, ZOOM_HEIGHT_MAX)
}

function handleChat(key) {
  if (key == "Enter") {
    if (!Chat.isChatFocused() && !Chat.isInputEmpty()) {
      game.socket.emit('text', Chat.filterMessage(Chat.getInputText()))
      Chat.resetInput()
    }
    Chat.toggle()
  }
}

function onKeyDown(e) {
  if (game.playing) {
    handleChat(e.key)

    switch (e.key) {
      case "w":
        game.player.movingUp = true
        break
      case "a":
        game.player.movingLeft = true
        break
      case "s":
        game.player.movingDown = true
        break
      case "d":
        game.player.movingRight = true
        break
      default:
        break
    }
  }
}

function onKeyUp(e) {
  if (game.playing) {
    switch (e.key) {
      case "w":
        game.player.movingUp = false
        break
      case "a":
        game.player.movingLeft = false
        break
      case "s":
        game.player.movingDown = false
        break
      case "d":
        game.player.movingRight = false
        break
      default:
        break
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function handleCamera() {
  // Lerp zoom changed by mouse wheel.
  game.currentZoom = THREE.Math.lerp(game.currentZoom, game.zoom, 0.02)

  // Lerp scene transition for a smooth effect.
  game.cutSceneDropValue = THREE.Math.lerp(game.cutSceneDropValue, CUTSCENE_STARTING_HEIGHT, 0.03)

  const z = CAMERA_HEIGHT - game.currentZoom + CUTSCENE_STARTING_HEIGHT - game.cutSceneDropValue
  camera.position.z = z;

}

function animate() {
  setupPlayer()

  if (game.playing) {
    handleCamera()
    handlePlayerMovement()
  }

  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function handlePlayerMovement() {
  if (!Chat.isChatFocused()) // Do not let player move if their typing a message.
    return
  if (game.player.movingUp) {
    game.player.move(new THREE.Vector3(0, 1, 0), 0.05)
    game.sendData = true
  }
  if (game.player.movingDown) {
    game.player.move(new THREE.Vector3(0, -1, 0), 0.05)
    game.sendData = true
  }
  if (game.player.movingRight) {
    game.player.move(new THREE.Vector3(1, 0, 0), 0.05)
    game.sendData = true
  }
  if (game.player.movingLeft) {
    game.player.move(new THREE.Vector3(-1, 0, 0), 0.05)
    game.sendData = true
  }
}

function setupPlayer() {
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
      console.log(game.socket.connected)
    })

    socketListener()

    game.creatingPlayer = false
    game.playing = true
  }
}

function socketListener() {
  game.socket.on('handshake', function (data) {
    Chat.logChatMessage(`Connected to ${getURL()}`, false)
    game.player.id = data
  })

  game.socket.on('players', function (data) {
    const entries = Object.entries(data)
    for (const [id, player] of entries) {
      if (game.player == null) continue
      if (id == game.player.id) continue
      game.players[id] = new Player(player)
      if (game.firstSetupDone)
        Chat.logChatMessage(`Player ${game.players[id].name} has connected`)
    }
    if (!game.firstSetupDone)
      game.firstSetupDone = true
  })

  game.socket.on('player_transforms', function (data) {
    // The server does not care if the client is not ready for player transforms update.
    // This is why we have to check if the length is 0 in case game.players is not ready.
    if (Object.keys(game.players).length == 0) return

    const entries = Object.entries(data)
    for (const [id, player] of entries) {
      if (game.player == null) continue
      if (id == game.player.id) continue
      let theplayer = game.players[id]
      theplayer.x = player.x
      theplayer.y = player.y
      theplayer.angle = player.angle
    }
  })

  game.socket.on('messages', function (data) {
    if (data.id == game.player.id) {
      Chat.logChatMessage(`${game.player.name}: ${data.text}`, true, true)
      game.player.updateMessage(data.text)
    } else {
      // Should we delete the player at game.players[data.id] here? Or just check if its not undefined??
      if (game.players[data.id] != undefined) {
        Chat.logChatMessage(`${game.players[data.id].name}: ${data.text}`)
        game.players[data.id].updateMessage(data.text)
      }
    }
  })

  game.socket.on('player_disconnected', function (id) {
    Chat.logChatMessage(`Player ${game.players[id].name} has disconnected`)
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