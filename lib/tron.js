const $       = require('jquery')
const _       = require('lodash')
const Cycle   = require('./cycle')

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var color     = "#31FDE8";
var color2    = "#FF1818";
var tronFont  = '60px tron';
var wall      = [];

var cycleSize = 2;

var cycle     = new Cycle(10, 200, cycleSize, cycleSize, canvas, context, color,'right');
var cycle2    = new Cycle(590, 200, cycleSize, cycleSize, canvas, context, color2, 'left');


requestAnimationFrame(function gameLoop() {

  updateWalls(cycle);
  updateWalls(cycle2);

  cycle.move(cycle.direction).draw();
  cycle2.move(cycle2.direction).draw();

  if (collisionCheck(cycle)){
    return showWinner(context, color, 1)
  }
  else if(collisionCheck(cycle2)){
    return showWinner(context, color2, 2)
  }

  requestAnimationFrame(gameLoop);
});


function showWinner(context, color, num) {
  context.font      = tronFont;
  context.fillStyle = color;
  context.fillText("Player " + num + " Wins!", 75, 190);

}


function updateWalls(player) {
  if (_.find(wall, [player.x, player.y]) === undefined ) {
    switch (player.direction) {
      case 'up':
        wall.push([player.x, player.y]);
        wall.push([player.x, player.y + 1]);
        break;
      case 'down':
        wall.push([player.x, player.y - 1]);
        wall.push([player.x, player.y]);
        break;
      case 'left':
        wall.push([player.x,     player.y + 1]);
        wall.push([player.x + 1, player.y + 1]);
        break;
      case 'right':
        wall.push([player.x,     player.y + 1]);
        wall.push([player.x - 1, player.y + 1]);
        break;

    }
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
        playerSpeed(cycle, 'left');
        break;

      case 37:
        playerSpeed(cycle2, 'left');
        break;

      case 87:
        playerSpeed(cycle, 'up');
        break;
      case 38:
        playerSpeed(cycle2, 'up');
        break;

      case 68:
        playerSpeed(cycle, 'right');
        break;
      case 39:
        playerSpeed(cycle2, 'right');
        break;

      case 83:
        playerSpeed(cycle, 'down');
        break;
      case 40:
        playerSpeed(cycle2, 'down');
        break;

    }


    }

    function playerSpeed(player, direction) {
      if(player.direction === direction) {
        player.speed = 2;
      } else {
        player.speed = 1;
      }
      player.direction = direction;

    }

  }, false);

}

$("#canvas").focus();
playerCycleDirection();

