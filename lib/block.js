const $ = require('jquery')
const _ = require('lodash')


var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');


var direction = 'left';
var color = "#31FDE8";

var direction2 = 'right'
var color2 = "#FF1818";

var wall = [];
var tronFont = '60px tron';


var block  = new Block(590, 200, 5, 5, canvas, context, color);
var block2 = new Block(10, 200, 5, 5, canvas, context, color2);

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

  updateWalls(block);
  updateWalls(block2);

  block.move(direction).draw();
  block2.move(direction2).draw();

  checkForCollisions(block, block2);


  requestAnimationFrame(gameLoop);
});


function checkForCollisions(player1, player2) {

  if (collisionCheck(player1)) {

    context.font      = tronFont;
    context.fillStyle = color;

    return context.fillText("Player 1 Wins!", 75, 190);
  } else if (collisionCheck(player2)){

    context.font      = tronFont;
    context.fillStyle = color2;

    return context.fillText("Player 2 Wins!", 75, 190);
  }

};


function updateWalls(player) {
  if (_.find(wall, [player.x, player.y]) === undefined ) {
    wall.push([player.x, player.y]);
  }
}

function collisionCheck(block) {
  if (_.some(wall, [block.x, block.y])) {
    return true;
  }
  return false;
};


function playerCycyleDirection (event) {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37:
        return direction = 'left';
        break;
      case 65:
        return direction2 = 'left';
        break;

      case 38:
        return  direction = 'up';
        break;
      case 87:
        return direction2 = 'up';
        break;

      case 39:
        return direction = 'right';
      case 68:
        return direction2 = 'right';
        break;

      case 40:
        return direction = 'down';
      case 83:
        return direction2 = 'down';
        break;
    }
  }, false);
}


window.onload = function () {
  var canvas    = document.getElementById('canvas');
  var context   = canvas.getContext('2d');

  playerCycyleDirection();

  // GameLoopManager.run(GameTick);
};


module.exports = Block;

