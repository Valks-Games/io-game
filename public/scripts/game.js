class Game {
  constructor() {
    // Font
    this.font;

    // Socket
    this.socket;
    this.sendData = false;

    // Player
    this.player;
    this.playerName = "";
    this.creatingPlayer = false;
    this.playing = false;
    this.players = {};
    this.id;

    // Zoom
    this.zoom = 0;
    this.currentZoom = 0;

    // Cutscene Transition
    this.cutSceneDropValue = 0;
  }
}