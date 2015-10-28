const Cycle = require ('./cycle')
const _       = require('lodash');

var snd       = new Audio("explosion.mp3");
var revSnd    = new Audio("rev.mp3")


function Game() {
  this.cycle     = new Cycle(10, 200, 1, "#2BE7FA",'right');
  this.cycle2    = new Cycle(790, 200, 2, "#FDAA02", 'left');
  this.lightRibbons = [];

}

var getCanvas       = document.getElementById('canvas');
var getInstructions = document.getElementById('instructions');
var getMovie        = document.getElementById('movie');
var getStartButton  = document.getElementById('start-game')


Game.prototype.start = function(context) {
  this.showTurbo();
  this.showScore();

  renderButtons();

}

Game.prototype.collision = function(player) {
  if (_.some(this.lightRibbons, [player.x, player.y])) {
    return true;
  }
}

Game.prototype.playerTurbosRemaining = function (game) {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 81:

        if(game.cycle.turbo > 0 && game.cycle.speed === 1) {
          revSnd.play();
          game.cycle.speed = 2;
          game.cycle.turbo -= 1;
          game.showTurbo();
        }
        break;

      case 16:
        if(game.cycle2.turbo > 0 && game.cycle2.speed === 1) {
          revSnd.play();
          game.cycle2.speed = 2;
          game.cycle2.turbo -= 1;
          game.showTurbo();
        }
        break;
    }
  }, false);
}


Game.prototype.showTurbo = function() {
  var turboDiv1       = document.getElementById('turbo1');
  var turboDiv2       = document.getElementById('turbo2');

  turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(this.cycle.turbo, function () {return "."}).join("")
  turboDiv2.innerHTML =  _.times(this.cycle2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
}


Game.prototype.showScore = function () {
  var scoreDiv1       = document.getElementById('score1');
  var scoreDiv2       = document.getElementById('score2');

  scoreDiv1.innerHTML = this.cycle.score;
  scoreDiv2.innerHTML = this.cycle2.score;
}


// Game.prototype.updateLightCycleRibbon = function (game) {
//   if (_.find(this.lightRibbons, [this.x, this.y]) === undefined ) {
//     switch (this.direction) {
//       case 'up':
//         this.lightRibbons.push([this.x, this.y + 1]);
//         break;
//       case 'down':
//         this.lightRibbons.push([this.x, this.y - 1]);
//         break;
//       case 'left':
//         this.lightRibbons.push([this.x + 1, this.y]);
//         break;
//       case 'right':
//         this.lightRibbons.push([this.x - 1, this.y]);
//         break;
//
//     }
//     this.lightRibbons.push([this.x, this.y]);
//   }
// }

function renderButtons() {
  getCanvas.removeAttribute("class", "hidden")
  getInstructions.setAttribute("class", "hidden")
  getMovie.setAttribute("class", "hidden")
  getStartButton.setAttribute("class", "hidden");
}

module.exports = Game;
