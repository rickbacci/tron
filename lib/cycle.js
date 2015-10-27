function Cycle(x, y, number, color, direction) {
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


function checkLeftBoundry (_this) {

  if((_this.x - 1) < 0) {
    return _this.x = 800;
  } else {
    return _this.x -= _this.speed;
  }
}

function checkRightBoundry (_this) {

  if((_this.x + 1) > 800) {
    return _this.x = 0;
  } else {
    return _this.x += _this.speed;
  }
  console.log('Player 1 Wins!');
}


function checkTopBoundry (_this) {

  if((_this.y - 1) < 0) {
    return _this.y = 450;
  } else {
    return _this.y -= _this.speed;
  }
}


function checkBottomBoundry (_this) {

  if((_this.y + 1) > 450) {
    return _this.y = 0;
  } else {
    return _this.y += _this.speed;
  }
}

module.exports = Cycle;
