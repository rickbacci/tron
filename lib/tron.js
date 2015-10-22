const $      = require('jquery')
const _      = require('lodash')
const Cycle  = require('./cycle')

var canvas   = document.getElementById('canvas');
var context  = canvas.getContext('2d');
var color    = "#31FDE8";
var color2   = "#FF1818";
var tronFont = '60px tron';
var wall     = [];


var cycle  = new Cycle(10, 200, 5, 5, canvas, context, color, 1, 'right');
var cycle2 = new Cycle(590, 200, 5, 5, canvas, context, color2, 1, 'left' );

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
        if(cycle.direction === 'left') {
          cycle.speed = 2;
        } else {
          cycle.speed = 1;
        }
        cycle.direction = 'left'
        break;

      case 37:
        if(cycle2.direction === 'left') {
          cycle2.speed = 2;
        } else {
          cycle2.speed = 1;
        }
        cycle2.direction = 'left'
        break;

      case 87:
        if(cycle.direction === 'up') {
          cycle.speed = 2;
        } else {
          cycle.speed = 1;
        }
        cycle.direction = 'up'
        break;
      case 38:
        if(cycle2.direction === 'up') {
          cycle2.speed = 2;
        } else {
          cycle2.speed = 1;
        }
        cycle2.direction = 'up'
        break;

      case 68:
        if(cycle.direction === 'right') {
          cycle.speed = 2;
        } else {
          cycle.speed = 1;
        }
        cycle.direction = 'right';
        break;
      case 39:
        if(cycle2.direction === 'right') {
          cycle2.speed = 2;
        } else {
          cycle2.speed = 1;
        }
        cycle2.direction = 'right';
        break;

      case 83:
        if(cycle.direction === 'down') {
          cycle.speed = 2;
        } else {
          cycle.speed = 1;
        }
        cycle.direction = 'down';
        break;
      case 40:
        if(cycle2.direction === 'down') {
          cycle2.speed = 2;
        } else {
          cycle2.speed = 1;
        }
        cycle2.direction = 'down';
        break;
    }
  }, false);
}

window.onload = function () {
  playerCycleDirection();
};
