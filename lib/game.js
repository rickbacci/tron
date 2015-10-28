const Cycle = require ('./cycle');
const _       = require('lodash');

var revSnd    = new Audio("rev.mp3");
var getCanvas       = document.getElementById('canvas');
var getInstructions = document.getElementById('instructions');
var getMovie        = document.getElementById('movie');
var getStartButton  = document.getElementById('start-game');


function Game() {
  this.cycle     = new Cycle(10, 225, 1, "#2BE7FA",'right');
  this.cycle2    = new Cycle(790, 225, 2, "#FDAA02", 'left');
  this.lightRibbons = [];
  this.winner = "";
  this.loser = "";
}

Game.prototype.start = function() {
  this.showTurbo();
  this.showScore();

  renderButtons();

};

Game.prototype.collision = function() {
  var location;
  var prevLocation;

  if(this.cycle.speed === 2) {
    switch (this.cycle.direction) {
      case 'up':
        location     = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y + 1]);
        if(location || prevLocation) {
          this.winner = this.cycle2;
          this.loser  = this.cycle;
          return true;
        }
        break;
      case 'down':
        location     = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y - 1]);
        if(location || prevLocation) {
          this.winner = this.cycle2;
          this.loser  = this.cycle;
          return true;
        }
        break;
      case 'left':
        location     = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle.x + 1, this.cycle.y]);
        if(location || prevLocation) {
          this.winner = this.cycle2;
          this.loser  = this.cycle;
          return true;
        }
        break;
      case 'right':
        location     = _.some(this.lightRibbons, [this.cycle.x, this.cycle.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle.x - 1, this.cycle.y]);
        if(location || prevLocation) {
          this.winner = this.cycle2;
          this.loser  = this.cycle;
          return true;
        }
        break;

    }
  }

  if(_.some(this.lightRibbons, [this.cycle.x, this.cycle.y])) {
    this.winner = this.cycle2;
    this.loser  = this.cycle;
    return true;
  }


  if(this.cycle2.speed === 2) {
    switch (this.cycle2.direction) {
      case 'up':
        location     = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y + 1]);
        if(location || prevLocation) {
          this.winner = this.cycle;
          this.loser  = this.cycle2;
          return true;
        }
        break;
      case 'down':
        location     = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y - 1]);
        if(location || prevLocation) {
          this.winner = this.cycle;
          this.loser  = this.cycle2;
          return true;
        }
        break;
      case 'left':
        location     = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle2.x + 1, this.cycle2.y]);
        if(location || prevLocation) {
          this.winner = this.cycle;
          this.loser  = this.cycle2;
          return true;
        }
        break;
      case 'right':
        location     = _.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]);
        prevLocation = _.some(this.lightRibbons, [this.cycle2.x - 1, this.cycle2.y]);
        if(location || prevLocation) {
          this.winner = this.cycle;
          this.loser  = this.cycle2;
          return true;
        }
        break;

    }
  }

  if(_.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y])) {
    this.winner = this.cycle;
    this.loser  = this.cycle2;
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
};


Game.prototype.showTurbo = function() {
  var turboDiv1       = document.getElementById('turbo1');
  var turboDiv2       = document.getElementById('turbo2');

  turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(this.cycle.turbo, function () {return "."}).join("");
  turboDiv2.innerHTML =  _.times(this.cycle2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
};


Game.prototype.showScore = function () {
  var scoreDiv1       = document.getElementById('score1');
  var scoreDiv2       = document.getElementById('score2');

  scoreDiv1.innerHTML = this.cycle.score;
  scoreDiv2.innerHTML = this.cycle2.score;
}


Game.prototype.updateLightCycleRibbons = function () {
  var cycle1Crash = (!_.some(this.lightRibbons, [this.cycle.x, this.cycle.y]))
  var cycle2Crash = (!_.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]))

  if (cycle1Crash) {
    switch (this.cycle.direction) {
      case 'up':
        this.lightRibbons.push([this.cycle.x, this.cycle.y + 1]);
        break;
      case 'down':
        this.lightRibbons.push([this.cycle.x, this.cycle.y - 1]);
        break;
      case 'left':
        this.lightRibbons.push([this.cycle.x + 1, this.cycle.y]);
        break;
      case 'right':
        this.lightRibbons.push([this.cycle.x - 1, this.cycle.y]);
        break;

    }
    this.lightRibbons.push([this.cycle.x, this.cycle.y]);
  }

  if (cycle2Crash) {
    switch (this.cycle2.direction) {
      case 'up':
        this.lightRibbons.push([this.cycle2.x, this.cycle2.y + 1]);
        break;
      case 'down':
        this.lightRibbons.push([this.cycle2.x, this.cycle2.y - 1]);
        break;
      case 'left':
        this.lightRibbons.push([this.cycle2.x + 1, this.cycle2.y]);
        break;
      case 'right':
        this.lightRibbons.push([this.cycle2.x - 1, this.cycle2.y]);
        break;

    }
    this.lightRibbons.push([this.cycle2.x, this.cycle2.y]);
  }

}

function renderButtons() {
  getCanvas.removeAttribute("class", "hidden");
  getInstructions.setAttribute("class", "hidden");
  getMovie.setAttribute("class", "hidden");
  getStartButton.setAttribute("class", "hidden");
}

module.exports = Game;
