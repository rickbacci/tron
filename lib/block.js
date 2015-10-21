const $ = require('jquery')
const _ = require('lodash')

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
// var direction = 'right';
var direction = '';
var wall = [];


var block = new Block(10,10, 5, 5, canvas, context);

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
  this.context.fillStyle="#31FDE8";
  return this;
};


window.onload = function() {

  document.addEventListener('keydown', function(event) {
    direction = getDirection(event)
  }, false);

}



function getDirection(event) {
  switch (event.keyCode) {
    case 37:
      console.log('left')
      return 'left'
      break;
    case 38:
      console.log('up')
      return 'up'
      break;
    case 39:
      console.log('right')
      return 'right'
      break;
    case 40:
      console.log('down')
      return 'down'
      break;
  }

}



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

requestAnimationFrame(function gameLoop() {

  if (_.find(wall, [block.x, block.y]) === undefined) {
    wall.push([block.x, block.y]);
  }

  block.move(direction).draw();
  collisionCheck(block);

  requestAnimationFrame(gameLoop);
});


function collisionCheck(block) {

  if (_.some(wall, [block.x, block.y])) {
   return console.log("game over");
  }
  return console.log('still alive')
};


module.exports = Block;
