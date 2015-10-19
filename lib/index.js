var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

const Block = require('./block.js');


Block.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Block.prototype.move = function () {
  this.x++;
  return this;
};


var block = new Block(10,10, 15, 15, canvas, context);

requestAnimationFrame(function gameLoop() {
  // context.clearRect(0, 0, canvas.width, canvas.height);

  block.draw().move();
  requestAnimationFrame(gameLoop);
});

