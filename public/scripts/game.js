class Game {
  constructor () {
    // Font
    this.font

    // Socket
    this.socket
    this.sendData = false

    // Objects
    this.players = {}
    this.messages = {}

    // Player
    this.player
    this.playerName = ''
    this.creatingPlayer = false
    this.playing = false

    // Zoom
    this.zoom = 0
    this.currentZoom = 0

    // Cutscene Transition
    this.cutSceneDropValue = 0
  }
}
