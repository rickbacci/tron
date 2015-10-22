function Board() {
  var canvas    = document.getElementById('canvas');
  var context   = canvas.getContext('2d');
}

Board.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd   = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.x);
  var yEnd   = Math.ceil(pos.y + size.y);

  this.canvas  = canvas;
  this.context = context;
}

Board.prototype.draw = function () {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle="#31FDE8";
  return this;
};

Board.prototype.draw2 = function () {

  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle="#FF1818";
  return this;
};
