// Font
let font;

// Socket
let socket;

// Player
let player;
let playerName = "";
let creatingPlayer = false;
let playing = false;
let players = [];
let id;

// Zoom
const CAMERA_HEIGHT = 600;

const ZOOM_HEIGHT_MAX = 0; // The smaller the value the 'higher' you can see..
const ZOOM_HEIGHT_MIN = 500; // The larger the value the 'closer' you can see..

let zoom = 0;
let currentZoom = 0;

// Cutscene Transition
const CUTSCENE_STARTING_HEIGHT = 100;

let cutSceneDropValue = 0;

//
function preload() {
  myFont = loadFont('./fonts/SourceSansPro-Black.otf');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(myFont);
}

function draw() {
  setupPlayer();

  if (playing) {
    background(200);

    handleCamera();

    drawPlayer();
    drawPlayers();
    drawTree(); // For reference.
  }
}

function setupPlayer() {
  if (creatingPlayer) {
    player = new Player({
      x: 100,
      y: 100,
      angle: 0,
      size: 25,
      health: 100,
      name: playerName,
      client: true
    });

    socket = io.connect('http://localhost:7777/', { // Make connection
      reconnect: true,
    });

    socket.emit('new_player', {
      x: player.x,
      y: player.y,
      name: player.name
    });

    listener();

    creatingPlayer = false;
    playing = true;
  }
}

function drawPlayer() {
  player.draw();
  player.handleMovement();
}

function drawPlayers() {
  for (element of players) {
    if (element.id == id) continue;
    new Player(element).draw();
  }
}

function handleCamera() {
  // Lerp zoom changed by mouse wheel.
  currentZoom = lerp(currentZoom, zoom, 0.02);

  // Lerp scene transition for a smooth effect.
  cutSceneDropValue = lerp(cutSceneDropValue, CUTSCENE_STARTING_HEIGHT, 0.03);

  let z = CAMERA_HEIGHT - currentZoom + CUTSCENE_STARTING_HEIGHT - cutSceneDropValue;
  camera(player.x, player.y, z, player.x, player.y, 0, 0, 1, 0);
}

function drawTree() {
  push();
  stroke(0);
  fill(94, 120, 117);
  sphere(50);
  pop();
}

function mouseWheel(event) {
  if (zoom <= ZOOM_HEIGHT_MIN && zoom >= ZOOM_HEIGHT_MAX) zoom -= event.delta;
  zoom = Math.min(zoom, ZOOM_HEIGHT_MIN);
  zoom = Math.max(zoom, ZOOM_HEIGHT_MAX);
}

function listener() {
  socket.on('handshake', function(data) {
    id = data;
  });

  socket.on('players', function(data) {
    players = data;
  });
}