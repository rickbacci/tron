const $ = require('jquery')
const _ = require('lodash')
const Block = require('./block')

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var direction = 'left';
var direction2 = 'right'
var color = "#31FDE8";
var color2 = "#FF1818";
var tronFont = '60px tron';
var wall = [];


var block = new Block(590, 200, 5, 5, canvas, context, color, 1 );
var block2 = new Block(10, 200, 5, 5, canvas, context, color2, 1);

requestAnimationFrame(function gameLoop() {

  updateWalls(block);
  updateWalls(block2);

  block.move(direction).draw();
  block2.move(direction2).draw();

  if ( collisionCheck(block)){
    context.font = tronFont;
    context.fillStyle = color;
    return context.fillText("Player 1 Wins!", 75, 190);
  }
  else if(collisionCheck(block2)){
    context.font = tronFont;
    context.fillStyle = color2;
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
    return true
  }
};

function playerCycleDirection (event) {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37:
        block2.speed = 2;
        return direction = 'left';
        break;
      case 65:
        block.speed = 2;
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
  playerCycleDirection();
};
