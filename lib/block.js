function Block(x, y, width, height, canvas, context, color) {
  this.x       = x;
  this.y       = y;
  this.width   = width;
  this.height  = height;
  this.canvas  = canvas;
  this.context = context;
  this.color   = color;
}

Block.prototype.move = function (direction) {

  switch (direction) {
    case 'up':
      checkTopBoundry(this);
      break;
    case 'down':
      checkBottomBoundry(this);
      break;
    case 'left':
      checkLeftBoundry(this);
      break;
    case 'right':
      checkRightBoundry(this);
      break;
  }
  return this;
};

Block.prototype.draw = function () {

  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle=this.color;
  return this;
};

function checkLeftBoundry (_this) {

  if((_this.x - 1) < 0) {
    return _this.x = 600;
  } else {
    console.log([_this.x, _this.y]);
    return _this.x--;
  }
};

function checkRightBoundry (_this) {

  if((_this.x + 1) > 600) {
    return _this.x = 0;
  } else {
    console.log([_this.x, _this.y]);
    return _this.x++;
  }
  console.log('Player 1 Wins!');
};


function checkTopBoundry (_this) {

  if((_this.y - 1) < 0) {
    return _this.y = 400;
  } else {
    console.log([_this.x, _this.y]);
    return _this.y--;
  }
};


function checkBottomBoundry (_this) {

  if((_this.y + 1) > 400) {
    return _this.y = 0;
  } else {
    console.log([_this.x, _this.y]);
    return _this.y++;
  }
};

module.exports = Block;
