const $       = require('jquery');
const _       = require('lodash');
const Cycle   = require('./cycle');
const Game    = require('./game');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var tronFont  = '60px tron';
var snd       = new Audio("explosion.mp3");

var game = new Game();

function gameLoop() {

  game.start();
  game.playerTurbosRemaining(game);
  game.updateLightCycleRibbons();

  moveCycles();
  drawCycles();

  if (game.collision(game.cycle)){
    return showWinner(game.cycle2);
  }
  else if(game.collision(game.cycle2)){
    return showWinner(game.cycle);
  }

  requestAnimationFrame(gameLoop);
}


function showWinner(player) {
  snd.play();
  context.font      = tronFont;
  context.fillStyle = player.color;
  context.fillText("Player " + player.number + " Wins!", 150, 190);
  player.score += 1;
  game.showScore();
  document.getElementById('reset-button').removeAttribute("class");
}



function clearScreen() {
  document.getElementById('reset-button').setAttribute("class", "hidden");
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function drawCycles() {
  context.shadowBlur = 10;

  context.fillStyle   = game.cycle.color;
  context.shadowColor = game.cycle.color;
  context.fillRect(game.cycle.x, game.cycle.y, game.cycle.width, game.cycle.height);

  context.fillStyle   = game.cycle2.color;
  context.shadowColor = game.cycle2.color;
  context.fillRect(game.cycle2.x, game.cycle2.y, game.cycle2.width, game.cycle2.height);
}




function moveCycles() {
  game.cycle.move(game.cycle.direction);
  game.cycle2.move(game.cycle2.direction);
}


function playerCycleDirection () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 65:
        setPlayerDirection(game.cycle, 'left');
        break;

      case 37:
        setPlayerDirection(game.cycle2, 'left');
        break;

      case 87:
        setPlayerDirection(game.cycle, 'up');
        break;
      case 38:
        setPlayerDirection(game.cycle2, 'up');
        break;

      case 68:
        setPlayerDirection(game.cycle, 'right');
        break;
      case 39:
        setPlayerDirection(game.cycle2, 'right');
        break;

      case 83:
        setPlayerDirection(game.cycle, 'down');
        break;
      case 40:
        setPlayerDirection(game.cycle2, 'down');
        break;
    }
  }, false);
}

function setPlayerDirection(player, direction) {
  player.speed = 1;
  player.direction = direction;
}


var resetGame = function() {
  clearScreen();
  game.cycle.x          = 10;
  game.cycle.y          = 225;
  game.cycle2.x         = 790;
  game.cycle2.y         = 225;
  game.cycle.direction  = "right";
  game.cycle2.direction = "left";
  game.cycle.speed      = 1;
  game.cycle2.speed     = 1;
  game.cycle.turbo      = 5;
  game.cycle2.turbo     = 5;
  game.lightRibbons     = [];
  document.getElementById('start-game').removeAttribute("class", "hidden");
  document.getElementById('instructions').removeAttribute("class", "hidden");
  document.getElementById('canvas').setAttribute("class", "hidden");
  document.getElementById('movie').removeAttribute("class", "hidden");
  clearGame();
};

function gameStart() {
  document.getElementById('reset-button').setAttribute("class", "hidden");

}

function clearGame() {
  gameLoop();
}



window.focus();
document.getElementById('canvas').setAttribute("class", "hidden");
playerCycleDirection();
document.getElementById('audio').pause();


gameStart();

document.getElementById('reset-button').addEventListener('click', resetGame , false);
document.getElementById('start-game').addEventListener('click', clearGame , false);

document.addEventListener("keypress", function(event) {
  if(event.keyCode === 13 && document.getElementById('audio').paused) {
    this.getElementById('audio').play();
  } else if (event.keyCode === 13){
    this.getElementById('audio').pause();
  }
});
