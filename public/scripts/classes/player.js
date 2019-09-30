class Player extends LivingEntity {
  constructor(a) {
    super(a);

    this.name = a.name;
    this.client = a.client;

    this.size = 25;
    this.storedAngle = a.angle;
  }

  draw() {
    if (this.client) {
      this.angle = parseFloat(Utils.angleTowardsMouse().toFixed(2));
    }
    
    if (this.angle != this.storedAngle) {
      game.sendData = true;
    }

    this.drawNonRotatingElements();
    this.drawRotatingElements();
  }
  
  drawNonRotatingElements() {
    push();
    fill(0);
    text(this.name, this.x - textWidth(this.name) / 2, this.y - this.size / 2 - textDescent());
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