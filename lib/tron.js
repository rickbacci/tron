const _       = require('lodash');
const Game    = require('./game');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var getReset  = document.getElementById('reset-button');
var getStart  = document.getElementById('start-game');
var getInst   = document.getElementById('instructions');
var getMovie  = document.getElementById('movie');
var getMusic  = document.getElementById('audio')
var tronFont  = '60px tron';
var snd       = new Audio("explosion.mp3");
var explosion = new Image();
var game = new Game();

function gameLoop() {

  game.start();
  game.playerTurbosRemaining(game);

  updateLightCycleRibbons();

  moveCycles();
  drawCycles();

  if (game.collision(game.cycle)){
    showExplosion(game.cycle)
    return showWinner(game.cycle2);
  }
  else if(game.collision(game.cycle2)){
    showExplosion(game.cycle2)
    return showWinner(game.cycle);
  }

  requestAnimationFrame(gameLoop);
};

function updateLightCycleRibbons() {
  updateLightCycleRibbon(game.cycle);
  updateLightCycleRibbon(game.cycle2);
}

function updateLightCycleRibbon(player) {
  if (_.find(game.lightRibbons, [player.x, player.y]) === undefined) {
    switch (player.direction) {
      case 'up':
        game.lightRibbons.push([player.x, player.y + 1]);
        break;
      case 'down':
        game.lightRibbons.push([player.x, player.y - 1]);
        break;
      case 'left':
        game.lightRibbons.push([player.x + 1, player.y]);
        break;
      case 'right':
        game.lightRibbons.push([player.x - 1, player.y]);
        break;

    }
    game.lightRibbons.push([player.x, player.y]);
  }
}

function gameInit() {
  window.focus();
  canvas.setAttribute("class", "hidden");
  playerCycleDirection();
  getMusic.pause();
  explosion.src = "explosion_trans.png";

  getReset.addEventListener('click', resetGame , false);
  getStart.addEventListener('click', clearGame , false);

  document.addEventListener("keypress", function(event) {
    if(event.keyCode === 13 && document.getElementById('audio').paused) {
      this.getElementById('audio').play();
    } else if (event.keyCode === 13){
      this.getElementById('audio').pause();
    }
  });
}

function showExplosion(player) {

  context.drawImage(explosion, player.x-25, player.y-25);
}

function showWinner(player) {
  snd.play();
  context.font      = tronFont;
  context.fillStyle = player.color;
  context.fillText("Player " + player.number + " Wins!", 170, 190);
  player.score += 1;
  game.showScore();
  getReset.removeAttribute("class");
}



function clearScreen() {
  getReset.setAttribute("class", "hidden");
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
  getStart.removeAttribute("class", "hidden");
  getInst.removeAttribute("class", "hidden");
  canvas.setAttribute("class", "hidden");
  getMovie.removeAttribute("class", "hidden");
  clearGame();
};

function gameStart() {
  getReset.setAttribute("class", "hidden");

}

function clearGame() {
  gameLoop();
}


gameInit();
