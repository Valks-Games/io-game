class Player extends LivingEntity {
  constructor(a) {
    super(a);
    this.id = 0;

    this.name = a.name;
    this.client = a.client;

    this.size = 25;
    this.storedAngle = a.angle;

    this.message = '';
    this.storedMessage = '';

    this.messageTimeout;
  }

  draw() {
    if (this.client) {
      this.angle = parseFloat(Utils.angleTowardsMouse().toFixed(2));
    }

    if (this.angle != this.storedAngle) {
      game.sendData = true;
    }

    this.drawRotatingElements();
    this.drawNonRotatingElements();
  }

  updateMessage(message) {
    clearTimeout(this.messageTimeout);
    this.message = message;
    this.messageTimeout = setTimeout(() => {
      this.clearMessage();
    }, 10 * 1000);
  }

  clearMessage() {
    this.message = '';
  }

  drawNonRotatingElements() {
    this.drawName();
    this.drawMessage();
  }

  drawName() {
    push();
    fill(0);
    text(this.name, this.x - textWidth(this.name) / 2, this.y - this.size / 2 - textDescent());
    pop();
  }

  drawMessage() {
    if (this.message == '') return;
    push();
    fill(0, 200);
    const padding = 2;
    noStroke();
    rect(this.x - textWidth(this.message) / 2 - padding, this.y - this.size / 1.5 - textAscent() * 2 + padding, textWidth(this.message) + padding * 2, textAscent(), 20);
    fill(255);
    text(this.message, this.x - textWidth(this.message) / 2, this.y - this.size / 1.5 - textAscent());
    stroke(0);
    pop();
  }

  drawRotatingElements() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + PI + PI / 2);
    translate(-this.x, -this.y);

    ellipse(this.x, this.y, this.size, this.size);
    ellipse(this.x, this.y + this.size / 4, this.size / 4, this.size / 4);

    pop();
  }

  handleMovement() {
    if (!isChatHidden()) // Do not let player move if their typing a message.
      return;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= 1;
      game.sendData = true;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += 1;
      game.sendData = true;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += 1;
      game.sendData = true;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= 1;
      game.sendData = true;
    }
  }
}