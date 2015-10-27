const $       = require('jquery');
const _       = require('lodash');
const Cycle   = require('./cycle');
const Game    = require('./game');
// var cycles    = require('./game');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var tronFont  = '60px tron';
var lightRibbons = [];
//
// var snd = new Audio("explosion.mp3");

// var revSnd = new Audio("rev.mp3")
// var cycle    = require('./game')
// var cycle2    = require('./game')
var game = new Game();
// var getCanvas = document.getElementById('canvas');
// var getInstructions = document.getElementById('instructions');
// var getMovie = document.getElementById('movie');

function gameLoop() {

  game.start();

  // showScore(cycle, cycle2);
// playerTurbosRemaining();
  // updateLightCycleRibbons();
  updateLightCycleRibbons();
  moveCycles();
  drawCycles();

  if (game.collision(game.cycle, lightRibbons)){
    return showWinner(game.cycle2);
  }
  else if(game.collision(game.cycle2, lightRibbons)){
    return showWinner(game.cycle);
  }

  requestAnimationFrame(gameLoop);
}


function showWinner(player) {

  context.font      = tronFont;
  context.fillStyle = player.color;
  context.fillText("Player " + player.number + " Wins!", 150, 190);
  // snd.play();
  player.score += 1;
  // showScore(cycle, cycle2);
  document.getElementById('reset-button').removeAttribute("class");
}



function clearScreen() {
  document.getElementById('reset-button').setAttribute("class", "hidden")
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


// function collisionCheck(player) {
//   if (_.some(lightRibbons, [player.x, player.y])) {
//     return true;
//   }
// }

function updateLightCycleRibbons() {
  updateLightCycleRibbon(game.cycle);
  updateLightCycleRibbon(game.cycle2);
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


function moveCycles() {
  game.cycle.move(game.cycle.direction);
  game.cycle2.move(game.cycle2.direction);
}

// function updateLightCycleRibbons() {
//   updateLightCycleRibbon(cycle);
//   updateLightCycleRibbon(cycle2);
// }

// function renderStartButton() {
//   // document.querySelector("#canvas").style.backgroundImage = 'url(tronbg.jpg)';
//   document.getElementById('start-game').setAttribute("class", "hidden");
// }



// function updateLightCycleRibbon(player) {
//   if (_.find(lightRibbons, [player.x, player.y]) === undefined ) {
//     switch (player.direction) {
//       case 'up':
//         lightRibbons.push([player.x, player.y + 1]);
//         break;
//       case 'down':
//         lightRibbons.push([player.x, player.y - 1]);
//         break;
//       case 'left':
//         lightRibbons.push([player.x + 1, player.y]);
//         break;
//       case 'right':
//         lightRibbons.push([player.x - 1, player.y]);
//         break;
//
//     }
//     lightRibbons.push([player.x, player.y]);
//   }
//
// }


function playerTurbosRemaining () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 81:
        if(game.cycle.turbo && game.cycle.speed === 1) {
          revSnd.play();
          game.cycle.speed = 2;
          game.cycle.turbo -= 1;
        }
        showTurbo(cycle, cycle2);
        break;

      case 16:
        if(game.cycle2.turbo && game.cycle.speed === 1) {
          revSnd.play();
          game.cycle2.speed = 2;
          game.cycle2.turbo -= 1;
        }
        showTurbo(game.cycle, game.cycle2);
        break;
    }
  }, false);
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

// function showTurbo(player1, player2) {
//   var turboDiv1 = document.getElementById('turbo1');
//   var turboDiv2 = document.getElementById('turbo2');
//
//   turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(player1.turbo, function () {return "."}).join("")
//   turboDiv2.innerHTML =  _.times(player2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
// }


// function showScore(player1, player2) {
//   var scoreDiv1 = document.getElementById('score1');
//   var scoreDiv2 = document.getElementById('score2');
//
//   scoreDiv1.innerHTML = 'Score: ' + player1.score;
//   scoreDiv2.innerHTML = 'Score: ' + player2.score;
// }

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
  game.cycle.x          = 10
  game.cycle.y          = 225
  game.cycle2.x         = 790
  game.cycle2.y         = 225
  game.cycle.direction  = "right"
  game.cycle2.direction = "left"
  game.cycle.speed      = 1
  game.cycle2.speed     = 1
  game.cycle.turbo      = 5
  game.cycle2.turbo     = 5
  document.getElementById('start-game').removeAttribute("class", "hidden")
  document.getElementById('instructions').removeAttribute("class", "hidden")
  document.getElementById('canvas').setAttribute("class", "hidden")
  document.getElementById('movie').removeAttribute("class", "hidden")
  // gameStart();
  clearGame();
}

function gameStart() {

  // showTurbo(cycle, cycle2);

  document.getElementById('reset-button').setAttribute("class", "hidden");

}

function clearGame() {
  clearScreen();
  // showTurbo(cycle, cycle2)
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
// playerTurbosRemaining();
document.getElementById('audio').pause();


// showScore(cycle, cycle2);
gameStart();

document.getElementById('reset-button').addEventListener('click', resetGame , false);
document.getElementById('start-game').addEventListener('click', resetGame , false);

document.addEventListener("keypress", function(event) {
  if(event.keyCode === 13 && document.getElementById('audio').paused) {
    this.getElementById('audio').play();
  } else if (event.keyCode==13){
    this.getElementById('audio').pause();
  }
});
