const $ = require('jquery')
const _ = require('lodash')

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var direction = 'right';
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
        return _this.x = 400;

      // else if(_.find(wall,[_this.x, _this.y]) == undefined)
      //   console.log("game over");
      //   return _this.x = 0;
      } else {
        return _this.x--;


      }
};

function checkRightBoundry (_this) {

      if((_this.x + 1) > 400) {
        return _this.x = 0;
      } else {
        return _this.x++;
      }
};

function checkTopBoundry (_this) {

      if((_this.y - 1) < 0) {
        return _this.y = 600;
      } else {
        return _this.y--;
      }
};

function checkBottomBoundry (_this) {

      if((_this.y + 1) > 600) {
        return _this.y = 0;
      } else {
        return _this.y++;
      }
};

requestAnimationFrame(function gameLoop() {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  if (_.find(wall,[block.x + 1, block.y + 1]) == undefined){
    block.move(direction).draw();
    wall.push([block.x, block.y]);
    // console.log([block.x, block.y]);
    // requestAnimationFrame(gameLoop);
  } else {

    return console.log("game over")
  }
  // block2.move(direction).draw();
  // block.move(direction).draw();
  // wall.push([block.x, block.y]);
  requestAnimationFrame(gameLoop);
});
module.exports = Block;
