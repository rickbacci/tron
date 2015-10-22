const $ = require('jquery')
const _ = require('lodash')


var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');


var direction = 'left';
var direction2 = 'right'
var wall = [];


var block = new Block(590, 200, 5, 5, canvas, context);
var block2 = new Block(10, 200, 5, 5, canvas, context);

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


Block.prototype.move2 = function (direction) {

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

Block.prototype.draw2 = function () {

  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle="#FF1818";
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


requestAnimationFrame(function gameLoop() {

  updateWalls(block);
  updateWalls(block2);

  block.move(direction).draw();
  block2.move2(direction2).draw2();

  if ( collisionCheck(block)){
    context.font = '60px tron';
    context.fillStyle = '#31FDE8';
    return context.fillText("Player 1 Wins!", 75, 190);
  }
  else if(collisionCheck(block2)){
    context.font = '60px tron';
    context.fillStyle = '#FF1818';
    return context.fillText("Player 2 Wins!", 75, 190);
  }

  requestAnimationFrame(gameLoop);
});


function updateWalls(player) {
  if (_.find(wall, [player.x, player.y]) === undefined ) {
    wall.push([player.x, player.y]);
  }
}

function collisionCheck(block) {
  if (_.some(wall, [block.x, block.y])) {
    return 'game over'
  }

};











function playerCycyleDirection (event) {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        direction = getDirection(event)
        break;
      case 65:
      case 87:
      case 68:
      case 83:
        direction2 = getDirection(event)
        break;
    }
  }, false);
};



function getDirection(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      console.log('left')
      return 'left'
      break;

    case 38:
    case 87:
      console.log('up')
      return 'up'
      break;

    case 39:
    case 68:
      console.log('right')
      return 'right'
      break;

    case 40:
    case 83:
      console.log('down')
      return 'down'
      break;
  }
}










window.onload = function () {
  var canvas    = document.getElementById('canvas');
  var context   = canvas.getContext('2d');

   playerCycyleDirection();

  // GameLoopManager.run(GameTick);
};


module.exports = Block;

