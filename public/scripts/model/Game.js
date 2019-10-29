class Game {
  constructor () {
    this.firstSetupDone = false

    // Font
    this.font = null

    // Socket
    this.socket = null
    this.sendData = false

    // Objects
    this.players = {}
    this.messages = {}

    // Player
    this.player = null
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
