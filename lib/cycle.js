class Cycle {
  constructor(x, y, number, color, direction) {
    this.x         = x;
    this.y         = y;
    this.number    = number;
    this.width     = 2;
    this.height    = 2;
    this.color     = color;
    this.speed     = 1;
    this.direction = direction;
    this.turbo     = 5;
    this.score     = 0;

  }

  move(direction) {
    switch (direction) {
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
    }
    return this;

  }

  moveLeft() {
    if((this.x - 1) < 0) {
      return this.x = 800;
    } else {
      return this.x -= this.speed;
    }
  }

  moveRight() {
    if((this.x + 1) > 800) {
      return this.x = 0;
    } else {
      return this.x += this.speed;
    }
  }

  moveUp() {
    if((this.y - 1) < 0) {
      return this.y = 450;
    } else {
      return this.y -= this.speed;
    }
  }

  moveDown() {

    if((this.y + 1) > 450) {
      return this.y = 0;
    } else {
      return this.y += this.speed;
    }
  }
}


module.exports = Cycle;
