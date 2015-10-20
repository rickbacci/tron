function Block(x, y, width, height, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.width   = width;
  this.height  = height;
  this.canvas  = canvas;
  this.context = context;
}

Block.prototype.move = function (direction) {

  switch (direction) {
    case 'up':
      this.y--;
      break;
    case 'down':
      this.y++;
      break;
    case 'left':
      this.x--;
      break;
    case 'right':
      this.x++;
      break;
  }
  return this;
};

Block.prototype.draw = function () {

  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle="#31FDE8";
  return this;
};

module.exports = Block;
