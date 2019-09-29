// Font
let font;

// Socket
let socket;

// Player
let player;

// Zoom
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
	
	player = new Player({x: 0, y: 0, angle: 0, size: 25, health: 100, name: "Player"});
	
	socket = io.connect('http://localhost:7777/', { // Make connection
      reconnect: true,
    });
}

function draw() {
	background(200);
	
	player.draw();
	player.handleMovement();
	
	// For reference.
	drawTree();
	
	handleCamera();
}

function handleCamera() {
	// Lerp zoom changed by mouse wheel.
	currentZoom = lerp(currentZoom, zoom, 0.02);
	
	// Lerp scene transition for a smooth effect.
	cutSceneDropValue = lerp(cutSceneDropValue, CUTSCENE_STARTING_HEIGHT, 0.03);
	
	let z = 600 - currentZoom + CUTSCENE_STARTING_HEIGHT - cutSceneDropValue;
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