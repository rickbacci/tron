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
        cycle.direction = 'left'
        leftSpeed(cycle)
        break;

      case 37:
        cycle2.direction = 'left'
        leftSpeed(cycle2);
        break;

      case 87:
        cycle.direction = 'up'
        upSpeed(cycle);
        break;
      case 38:
        cycle2.direction = 'up'
        upSpeed(cycle2);
        break;

      case 68:
        cycle.direction = 'right';
        rightSpeed(cycle);
        break;
      case 39:
        cycle2.direction = 'right';
        rightSpeed(cycle2);
        break;

      case 83:
        cycle.direction = 'down';
        downSpeed(cycle);
        break;
      case 40:
        cycle2.direction = 'down';
        downSpeed(cycle2);
        break;
    }

    function leftSpeed(player) {
      if(player.direction === 'left') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }

    }

    function upSpeed(player) {
      if(player.direction === 'up') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }

    }

    function rightSpeed(player) {
      if(player.direction === 'down') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }

    }


    function downSpeed(player) {
      if(player.direction === 'down') {
        player.speed = 2;
      } else {
        player.speed = 1;
      }

    }

  }, false);
}

$(document).ready( function () {
  $("#canvas").focus();
  playerCycleDirection();
});
