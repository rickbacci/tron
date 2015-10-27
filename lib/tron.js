const $       = require('jquery');
const _       = require('lodash');
const Cycle   = require('./cycle');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var color     = "#2BE7FA";
var color2    = "#FDAA02";
var tronFont  = '60px tron';
var lightRibbons = [];

var snd = new Audio("explosion.mp3");

var cycle     = new Cycle(10, 200, 1, color,'right');
var cycle2    = new Cycle(590, 200, 2, color2, 'left');


function gameLoop() {
  renderStartButton();
  showScore(cycle, cycle2);

  updateLightCycleRibbons();

  moveCycles();
  drawCycles();

  if (collisionCheck(cycle)){
    return showWinner(cycle2);
  }
  else if(collisionCheck(cycle2)){
    return showWinner(cycle);
  }

  requestAnimationFrame(gameLoop);
}


function showWinner(player) {

  context.font      = tronFont;
  context.fillStyle = player.color;
  context.fillText("Player " + player.number + " Wins!", 75, 190);
  snd.play();
  player.score += 1;
  showScore(cycle, cycle2);
  document.getElementById('reset-button').removeAttribute("class");
}



function clearScreen() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}


function drawCycles() {
  context.shadowBlur = 10;

  context.fillStyle   = cycle.color;
  context.shadowColor = cycle.color;
  context.fillRect(cycle.x, cycle.y, cycle.width, cycle.height);

  context.fillStyle   = cycle2.color;
  context.shadowColor = cycle2.color;
  context.fillRect(cycle2.x, cycle2.y, cycle2.width, cycle2.height);
}


function collisionCheck(player) {
  if (_.some(lightRibbons, [player.x, player.y])) {
    return true;
  }
}


function moveCycles() {
  cycle.move(cycle.direction);
  cycle2.move(cycle2.direction);
}

function updateLightCycleRibbons() {
  updateLightCycleRibbon(cycle);
  updateLightCycleRibbon(cycle2);
}

function renderStartButton() {
  document.querySelector("#canvas").style.backgroundImage = 'url(tronbg.jpg)';
  document.getElementById('start-game').setAttribute("class", "hidden");
}



function updateLightCycleRibbon(player) {
  if (_.find(lightRibbons, [player.x, player.y]) === undefined ) {
    switch (player.direction) {
      case 'up':
        lightRibbons.push([player.x, player.y + 1]);
        break;
      case 'down':
        lightRibbons.push([player.x, player.y - 1]);
        break;
      case 'left':
        lightRibbons.push([player.x + 1, player.y]);
        break;
      case 'right':
        lightRibbons.push([player.x - 1, player.y]);
        break;

    }
    lightRibbons.push([player.x, player.y]);
  }

}


function playerTurbosRemaining () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 81:
        if(cycle.turbo && cycle.speed === 1) {
          cycle.speed = 2;
          cycle.turbo -= 1;
        }
        showTurbo(cycle, cycle2);
        break;

      case 16:
        if(cycle2.turbo && cycle.speed === 1) {
          cycle2.speed = 2;
          cycle2.turbo -= 1;
        }
        showTurbo(cycle, cycle2);
        break;
    }
  }, false);
}

function playerCycleDirection () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 65:
        setPlayerDirection(cycle, 'left');
        break;

      case 37:
        setPlayerDirection(cycle2, 'left');
        break;

      case 87:
        setPlayerDirection(cycle, 'up');
        break;
      case 38:
        setPlayerDirection(cycle2, 'up');
        break;

      case 68:
        setPlayerDirection(cycle, 'right');
        break;
      case 39:
        setPlayerDirection(cycle2, 'right');
        break;

      case 83:
        setPlayerDirection(cycle, 'down');
        break;
      case 40:
        setPlayerDirection(cycle2, 'down');
        break;
    }
  }, false);
}

function setPlayerDirection(player, direction) {
  player.speed = 1;
  player.direction = direction;
}

function showTurbo(player1, player2) {
  var turboDiv1 = document.getElementById('turbo1');
  var turboDiv2 = document.getElementById('turbo2');

  turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(player1.turbo, function () {return "."}).join("")
  turboDiv2.innerHTML =  _.times(player2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
}


function showScore(player1, player2) {
  var scoreDiv1 = document.getElementById('score1');
  var scoreDiv2 = document.getElementById('score2');

  scoreDiv1.innerHTML = 'Score: ' + player1.score;
  scoreDiv2.innerHTML = 'Score: ' + player2.score;
}

// var resetGame = function() {
//   clearScreen();
//
//   lightRibbons     = [];
//   cycle.x          = 10;
//   cycle.y          = 200;
//   cycle2.x         = 590;
//   cycle2.y         = 200;
//   cycle.direction  = "right";
//   cycle2.direction = "left";
//   cycle.speed      = 1;
//   cycle2.speed     = 1;
//   cycle.turbo      = 5;
//   cycle2.turbo     = 5;
//
//   document.getElementById('start-game').removeAttribute("class", "hidden");
//   document.querySelector("#canvas").style.backgroundImage = 'url(sidetron.jpg)';
//   gameStart();
// };

function showScore(player1, player2) {
  var scoreDiv1 = document.getElementById('score1')
  var scoreDiv2 = document.getElementById('score2')


  scoreDiv1.innerHTML = player1.score

  scoreDiv2.innerHTML = player2.score
}

var resetGame = function() {
  clearScreen();
  lightRibbons     = [];
  cycle.x          = 10
  cycle.y          = 225
  cycle2.x         = 790
  cycle2.y         = 225
  cycle.direction  = "right"
  cycle2.direction = "left"
  cycle.speed      = 1
  cycle2.speed     = 1
  cycle.turbo      = 5
  cycle2.turbo     = 5
  document.getElementById('start-game').removeAttribute("class", "hidden")
  document.getElementById('instructions').removeAttribute("class", "hidden")
  document.getElementById('canvas').setAttribute("class", "hidden")
  document.getElementById('movie').removeAttribute("class", "hidden")
  // gameStart();
  clearGame();
}

function gameStart() {
  showTurbo(cycle, cycle2);
  document.getElementById('reset-button').setAttribute("class", "hidden");

}

function clearGame() {
  clearScreen();
  gameLoop();
}


// $("#canvas").focus();
// document.getElementById('canvas').setAttribute("class", "intro");
// playerCycleDirection();
// playerTurbosRemaining();
//
// showTurbo(cycle, cycle2);
// =======
//
  // document.getElementById('reset-button').setAttribute("class", "hidden")
  // context.clearRect(0, 0, canvas.width, canvas.height);
  // showTurbo(cycle, cycle2);
//   gameLoop();
// }

window.focus();
document.getElementById('canvas').setAttribute("class", "hidden")
playerCycleDirection();
document.getElementById('audio').pause();


showScore(cycle, cycle2);
gameStart();

document.getElementById('reset-button').addEventListener('click', resetGame , false);
document.getElementById('start-game').addEventListener('click', clearGame , false);

document.addEventListener("keypress", function(event) {
  if(event.keyCode === 13 && document.getElementById('audio').paused) {
    this.getElementById('audio').play();
  } else if (event.keyCode==13){
    this.getElementById('audio').pause();
  }
});

