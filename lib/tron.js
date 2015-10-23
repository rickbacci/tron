const $      = require('jquery')
const _      = require('lodash')
const Cycle  = require('./cycle')

var canvas   = document.getElementById('canvas');
var context  = canvas.getContext('2d');
var color    = "#31FDE8";
var color2   = "#FF1818";
var tronFont = '60px tron';
var wall     = [];

var blockSize = 2;

var cycle  = new Cycle(10, 200, blockSize, blockSize, canvas, context, color, 1, 'right');
var cycle2 = new Cycle(590, 200, blockSize, blockSize, canvas, context, color2, 1, 'left' );

requestAnimationFrame(function gameLoop() {

  updateWalls(cycle);
  updateWalls(cycle2);

  cycle.move(cycle.direction).draw();
  cycle2.move(cycle2.direction).draw();

  if ( collisionCheck(cycle)){
    context.font = tronFont;
    context.fillStyle = color;
    return context.fillText("Player 1 Wins!", 75, 190);
  }
  else if(collisionCheck(cycle2)){
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

function collisionCheck(player) {
  if (_.some(wall, [player.x, player.y])) {
    return true
  }
};

function playerCycleDirection (event) {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 65:
        leftSpeed(cycle, 'left');
        break;

      case 37:
        leftSpeed(cycle2, 'left');
        break;

      case 87:
        upSpeed(cycle, 'up');
        break;
      case 38:
        upSpeed(cycle2, 'up');
        break;

      case 68:
        rightSpeed(cycle, 'right');
        break;
      case 39:
        rightSpeed(cycle2, 'right');
        break;

      case 83:
        downSpeed(cycle, 'down');
        break;
      case 40:
        downSpeed(cycle2, 'down');
        break;
    }

    function leftSpeed(player, direction) {
      if(player.direction === 'left') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }
      player.direction = direction;

    }

    function upSpeed(player, direction) {
      if(player.direction === 'up') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }
      player.direction = direction;

    }

    function rightSpeed(player, direction) {
      if(player.direction === 'down') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }
      player.direction = direction;

    }

    function downSpeed(player, direction) {
      if(player.direction === 'down') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }
      player.direction = direction;

    }

  }, false);
}

$(document).ready( function () {
  $("#canvas").focus();
  playerCycleDirection();
});
