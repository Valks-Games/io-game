const CAMERA_HEIGHT = 600;
const ZOOM_HEIGHT_MAX = 0; // The smaller the value the 'higher' you can see..
const ZOOM_HEIGHT_MIN = 500; // The larger the value the 'closer' you can see..
const CUTSCENE_STARTING_HEIGHT = 100;

let game = new Game();

function preload() {
  game.font = loadFont('./fonts/SourceSansPro-Black.otf');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(game.font);
}

function draw() {
  setupPlayer();

  if (game.playing) {
    background(200);

    handleCamera();

    drawPlayer();

    drawPlayers();

    drawTree(); // For reference.
  }
}

function keyPressed() {
  if (!game.playing) return;
  if (!isChatHidden()) {
    if (keyCode == ENTER) {
      let text = getChatText();
      if (text != '') {
        game.socket.emit('text', getChatText());
        resetChat();
      }
    }
  }

  if (keyCode == ENTER) {
    toggleChat();
  }
}

function setupPlayer() {
  if (game.creatingPlayer) {
    game.player = new Player({
      x: 100,
      y: 100,
      angle: 0,
      size: 25,
      health: 100,
      name: game.playerName,
      client: true
    });

    let url = getURL(); // This way we can dynamically switch between localhost and external ips.

    game.socket = io.connect(url, { // Make connection
      reconnect: true,
    });

    game.socket.emit('new_player', {
      x: game.player.x,
      y: game.player.y,
      name: game.player.name
    });

    listener();

    game.creatingPlayer = false;
    game.playing = true;
  }
}

function drawPlayer() {
  game.player.draw();
  game.player.handleMovement();
}

function drawPlayers() {
  const players = Object.values(game.players);
  for (const player of players) {
    player.draw();
  }
}

function handleCamera() {
  // Lerp zoom changed by mouse wheel.
  game.currentZoom = lerp(game.currentZoom, game.zoom, 0.02);

  // Lerp scene transition for a smooth effect.
  game.cutSceneDropValue = lerp(game.cutSceneDropValue, CUTSCENE_STARTING_HEIGHT, 0.03);

  let z = CAMERA_HEIGHT - game.currentZoom + CUTSCENE_STARTING_HEIGHT - game.cutSceneDropValue;
  camera(game.player.x, game.player.y, z, game.player.x, game.player.y, 0, 0, 1, 0);
}

function drawTree() {
  push();
  stroke(0);
  fill(94, 120, 117);
  sphere(50);
  pop();
}

function mouseWheel(event) {
  if (game.zoom <= ZOOM_HEIGHT_MIN && game.zoom >= ZOOM_HEIGHT_MAX) game.zoom -= event.delta;
  game.zoom = Math.min(game.zoom, ZOOM_HEIGHT_MIN);
  game.zoom = Math.max(game.zoom, ZOOM_HEIGHT_MAX);
}

function listener() {
  game.socket.on('handshake', function(data) {
    game.player.id = data;
  });

  game.socket.on('players', function(data) {
    const entries = Object.entries(data);
    for (const [id, player] of entries) {
      if (id == game.player.id) continue;
      game.players[id] = new Player(player);
    }
  });

  game.socket.on('player_transforms', function(data) {
    // The server does not care if the client is not ready for player transforms update.
    // This is why we have to check if the length is 0 in case game.players is not ready.
    if (Object.keys(game.players).length == 0) return;

    const entries = Object.entries(data);
    for (const [id, player] of entries) {
      if (id == game.player.id) continue;
      let theplayer = game.players[id];
      theplayer.x = player.x;
      theplayer.y = player.y;
      theplayer.angle = player.angle;
    }
  });

  game.socket.on('messages', function(data) {
    if (data.id == game.player.id) {
      game.player.updateMessage(data.text);
    } else {
      game.players[data.id].updateMessage(data.text);
    }
  });

  game.socket.on('player_disconnected', function(data) {
    delete(game.players[data]);
  });

  game.socket.on('disconnect', (reason) => {
    // Server closed.
    if (reason === 'transport close') {
      displayMenu();
      background(20, 20, 20);
      game.playing = false;
      game.socket.disconnect();
    }
  });
}

setInterval(function() { // This is the client sending data to the server every 33 milliseconds. (Emit ourself (this client) to the server.)
  if (game.sendData) {
    game.sendData = false;
    if (game.player) { // Only emit if the client exists.
      game.socket.emit('player_transform', {
        x: game.player.x,
        y: game.player.y,
        angle: game.player.angle
      });
    }
  }
}, 33);