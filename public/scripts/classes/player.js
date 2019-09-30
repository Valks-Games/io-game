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
    this.message = message;
    setTimeout(() => {
      this.clearMessage();
    }, 1000);
  }

  clearMessage() {
    this.message = '';
  }

  drawNonRotatingElements() {
    push();
    fill(0);
    text(this.name, this.x - textWidth(this.name) / 2, this.y - this.size / 2 - textDescent());
    pop();

    text(this.message, this.x, this.y);
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