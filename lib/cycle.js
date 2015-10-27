function Cycle(x, y, width, height, canvas, context, color, direction, turbo, score) {
  this.x         = x;
  this.y         = y;
  this.width     = width;
  this.height    = height;
  this.canvas    = canvas;
  this.context   = context;
  this.color     = color;
  this.speed     = 1;
  this.direction = direction;
  this.turbo     = turbo;
  this.score     = score;
}

Cycle.prototype.move = function (direction) {

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

Cycle.prototype.draw = function () {
  this.context.fillStyle=this.color;
  this.context.shadowColor = this.color;
  this.context.shadowBlur = 10
  // this.context.shadowOffsetX = 1;
  // this.context.shadowOffsetY = 1;
  this.context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

function checkLeftBoundry (_this) {

  if((_this.x - 1) < 0) {
    return _this.x = 800;
  } else {
    // console.log([_this.x, _this.y]);
    return _this.x -= _this.speed;
  }
}

function checkRightBoundry (_this) {

  if((_this.x + 1) > 800) {
    return _this.x = 0;
  } else {
    // console.log([_this.x, _this.y]);
    return _this.x += _this.speed;
  }
  console.log('Player 1 Wins!');
}


function checkTopBoundry (_this) {

  if((_this.y - 1) < 0) {
    return _this.y = 450;
  } else {
    // console.log([_this.x, _this.y]);
    return _this.y -= _this.speed;
  }
}


function checkBottomBoundry (_this) {

  if((_this.y + 1) > 450) {
    return _this.y = 0;
  } else {
    // console.log([_this.x, _this.y]);
    return _this.y += _this.speed;
  }
}

module.exports = Cycle;
