function Block(x, y, width, height, canvas, context) {
  this.x       = x;
  this.y       = y;
  this.width   = width;
  this.height  = height;
  this.canvas  = canvas;
  this.context = context;
}

module.exports = Block;
