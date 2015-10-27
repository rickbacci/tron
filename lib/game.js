const Cycle = require ('./cycle')
const _       = require('lodash');

var tronFont  = '60px tron';
// var lightRibbons = [];

var snd = new Audio("explosion.mp3");
var revSnd = new Audio("rev.mp3")

var cycle     = new Cycle(10, 200, 1, "#2BE7FA",'right');
var cycle2    = new Cycle(790, 200, 2, "#FDAA02", 'left');

var getCanvas = document.getElementById('canvas');
var getInstructions = document.getElementById('instructions');
var getMovie = document.getElementById('movie');
var getStartButton = document.getElementById('start-game')
function Game() {
}

Game.prototype.cycle = cycle;

Game.prototype.cycle2 = cycle2;

Game.prototype.start = function(context) {
  showTurbo(cycle, cycle2);
  playerTurbosRemaining();
  // playerCycleDirection();
  renderButtons();
  showScore(cycle, cycle2);
  // updateLightCycleRibbons();
  // moveCycles();
  // drawCycles(context);

}

Game.prototype.collision = function(player, lightRibbons) {
  if (_.some(lightRibbons, [player.x, player.y])) {
      return true;
    }
}


function renderButtons() {
  getCanvas.removeAttribute("class", "hidden")
  getInstructions.setAttribute("class", "hidden")
  getMovie.setAttribute("class", "hidden")
  getStartButton.setAttribute("class", "hidden");
}

function showScore(player1, player2) {
  var scoreDiv1 = document.getElementById('score1');
  var scoreDiv2 = document.getElementById('score2');

  scoreDiv1.innerHTML = player1.score;
  scoreDiv2.innerHTML = player2.score;
}

// function updateLightCycleRibbons() {
//   updateLightCycleRibbon(cycle);
//   updateLightCycleRibbon(cycle2);
// }
//
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
// }

// function moveCycles() {
//   cycle.move(cycle.direction);
//   cycle2.move(cycle2.direction);
// }

// function drawCycles(context) {
//   context.shadowBlur = 10;
//
//   context.fillStyle   = cycle.color;
//   context.shadowColor = cycle.color;
//   context.fillRect(cycle.x, cycle.y, cycle.width, cycle.height);
//
//   context.fillStyle   = cycle2.color;
//   context.shadowColor = cycle2.color;
//   context.fillRect(cycle2.x, cycle2.y, cycle2.width, cycle2.height);
// }

// function playerCycleDirection () {
//   document.addEventListener('keydown', function(event) {
//     switch (event.keyCode) {
//
//       case 65:
//         setPlayerDirection(cycle, 'left');
//         break;
//
//       case 37:
//         setPlayerDirection(cycle2, 'left');
//         break;
//
//       case 87:
//         setPlayerDirection(cycle, 'up');
//         break;
//       case 38:
//         setPlayerDirection(cycle2, 'up');
//         break;
//
//       case 68:
//         setPlayerDirection(cycle, 'right');
//         break;
//       case 39:
//         setPlayerDirection(cycle2, 'right');
//         break;
//
//       case 83:
//         setPlayerDirection(cycle, 'down');
//         break;
//       case 40:
//         setPlayerDirection(cycle2, 'down');
//         break;
//     }
//   }, false);
// }
//
// function setPlayerDirection(player, direction) {
//   player.speed = 1;
//   player.direction = direction;
// }

function playerTurbosRemaining () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 81:
        if(cycle.turbo > 0 && cycle.speed === 1) {
          revSnd.play();
          cycle.speed = 2;
          cycle.turbo -= 1;
          showTurbo(cycle, cycle2);
        }
        // showTurbo(cycle, cycle2);
        break;

      case 16:
        if(cycle2.turbo > 0 && cycle2.speed === 1) {
          revSnd.play();
          cycle2.speed = 2;
          cycle2.turbo -= 1;
          showTurbo(cycle, cycle2);
        }
        // showTurbo(cycle, cycle2);
        break;
    }
  }, false);
}

function showTurbo(player1, player2) {
  var turboDiv1 = document.getElementById('turbo1');
  var turboDiv2 = document.getElementById('turbo2');

  turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(player1.turbo, function () {return "."}).join("")
  turboDiv2.innerHTML =  _.times(player2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
}



module.exports = Game;
