class Player extends LivingEntity {
  constructor (a) {
    super(a)
    this.id = 0

    this.name = a.name
    this.client = a.client

    this.size = 25
    this.storedAngle = a.angle

    this.message = ''
    this.storedMessage = ''

    this.messageTimeout = null

    this.swingBack = false
    this.swingRefAngleRetrieved = false
    this.swingRefAngle = 0
    this.attacking = false
    this.recovering = false
    this.counter = 0
  }

  draw () {
    if (this.client) {
      const delay = 20 * 1 // 1 second

      // Recover delay between attacks.
      if (this.recovering) {
        this.counter = this.counter + 1
        if (this.counter >= delay) {
          this.recovering = false
          this.counter = 0
        }
      }

      // Attack Animation
      if (this.attacking && !this.recovering) {
        // Retrieve reference angle to where player was last angled.
        if (!this.swingRefAngleRetrieved) {
          this.swingRefAngle = this.angle
          this.swingRefAngleRetrieved = true
        }

        const swingSpeed = 0.05
        const swingArc = 1.00

        if (this.angle < this.swingRefAngle + swingArc && !this.swingBack) {
          // Starting swinging forwards to the defined arc.
          this.angle += swingSpeed
        } else {
          // Once we have got to the arc, swing back.
          this.swingBack = true
          this.angle -= (swingSpeed * 5)

          // Once we have got back to the start, reset all the values for next swing.
          if (this.angle <= this.swingRefAngle) {
            this.swingBack = false
            this.swingRefAngleRetrieved = false
            this.attacking = false
            this.recovering = true
          }
        }
      } else {
        // Player looks at mouse position.
        const mouseAngle = parseFloat(angleTowardsMouse().toFixed(2))

        if (this.angle < mouseAngle - PI) this.angle = this.angle + TWO_PI
        if (this.angle > mouseAngle + PI) this.angle = this.angle - TWO_PI

        this.angle = lerp(this.angle, mouseAngle, 0.04)
      }
    }

    // Only send angle data over the network if the angle value changes.
    if (this.angle !== this.storedAngle) {
      game.sendData = true
    }

    this.drawRotatingElements()
    this.drawNonRotatingElements()
  }

  // Update the chat message on this client.
  updateMessage (message) {
    clearTimeout(this.messageTimeout)
    this.message = message
    this.messageTimeout = setTimeout(() => {
      this.clearMessage()
    }, 10 * 1000)
  }

  // Clear the chat message on this client.
  clearMessage () {
    this.message = ''
  }

  drawNonRotatingElements () {
    this.drawName()
    this.drawMessage()
  }

  drawName () {
    push()
    fill(0)
    text(this.name, this.x - textWidth(this.name) / 2, this.y - this.size / 2 - textDescent())
    pop()
  }

  drawMessage () {
    if (this.message === '') return
    push()
    fill(0, 200)
    const padding = 2
    noStroke()
    rect(this.x - textWidth(this.message) / 2 - padding, this.y - this.size / 1.5 - textAscent() * 2 + padding, textWidth(this.message) + padding * 2, textAscent(), 20)
    fill(255)
    text(this.message, this.x - textWidth(this.message) / 2, this.y - this.size / 1.5 - textAscent())
    stroke(0)
    pop()
  }

  drawRotatingElements () {
    push()
    translate(this.x, this.y)
    rotate(this.angle + PI + PI / 2)
    translate(-this.x, -this.y)

    this.drawCharacter()

    pop()
  }

  drawCharacter () {
    strokeWeight(2)

    this.drawWeapon()

    ellipse(this.x, this.y, this.size, this.size)
    ellipse(this.x, this.y + this.size / 4, this.size / 4, this.size / 4)
  }

  drawWeapon () {
    const hammerHeadWidth = 10
    const hammerHeadHeight = 10

    const hammerHandleLength = 20
    const hammerHandleThickness = 1

    // Handle
    rect(this.x - hammerHandleLength / 2, this.y + 12, hammerHandleLength, hammerHandleThickness)

    // Hammer head
    rect(this.x - hammerHeadWidth / 2 - 15, this.y + 7, hammerHeadWidth, hammerHeadHeight)
  }

  handleMovement () {
    // Do not let player move if their typing a message.
    if (!Chat.isChatFocused()) return
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 1
      game.sendData = true
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 1
      game.sendData = true
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 1
      game.sendData = true
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 1
      game.sendData = true
    }
  }

  handleAttack () {

  }
}
