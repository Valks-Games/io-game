class Entity {
  constructor (a) {
    this.x = a.x
    this.y = a.y
    this.angle = a.angle
    this.size = a.size

    if (this.x === undefined) { this.x = 0 }
    if (this.y === undefined) { this.y = 0 }
    if (this.angle === undefined) { this.angle = 0 }
    if (this.size === undefined) { this.size = 20 }
  }

  draw () {

  }
}
