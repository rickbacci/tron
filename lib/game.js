const Cycle = require ('./cycle');
const _       = require('lodash');

var revSnd    = new Audio("media/rev.mp3");
var getCanvas       = document.getElementById('canvas');
var getInstructions = document.getElementById('instructions');
var getMovie        = document.getElementById('movie');
var getStartButton  = document.getElementById('start-game');


function Game() {
  this.cycle     = new Cycle(10, 225, 1, "#2BE7FA",'right');
  this.cycle2    = new Cycle(790, 225, 2, "#FDAA02", 'left');
  this.lightRibbons = [];

}

Game.prototype.start = function() {
  this.showTurbo();
  this.showScore();
  this.playerTurbosRemaining();
  this.updateLightCycleRibbons();
  this.playerCycleDirection();
  this.moveCycles();
  renderButtons();
};

Game.prototype.collision = function(player) {
  var location;
  var prevLocation;

  if(player.speed === 2) {
    switch (player.direction) {
      case 'up':
        location     = _.some(this.lightRibbons, [player.x, player.y]);
        prevLocation = _.some(this.lightRibbons, [player.x, player.y + 1]);
        if(location || prevLocation) {
          return true;
        }
        break;
      case 'down':
        location     = _.some(this.lightRibbons, [player.x, player.y]);
        prevLocation = _.some(this.lightRibbons, [player.x, player.y - 1]);
        if(location || prevLocation) {
          return true;
        }
        break;
      case 'left':
        location     = _.some(this.lightRibbons, [player.x, player.y]);
        prevLocation = _.some(this.lightRibbons, [player.x + 1, player.y]);
        if(location || prevLocation) {
          return true;
        }
        break;
      case 'right':
        location     = _.some(this.lightRibbons, [player.x, player.y]);
        prevLocation = _.some(this.lightRibbons, [player.x - 1, player.y]);
        if(location || prevLocation) {
          return true;
        }
        break;

    }
  }

  if(_.some(this.lightRibbons, [player.x, player.y])) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.playerTurbosRemaining = function () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 81:

        if(this.cycle.turbo > 0 && this.cycle.speed === 1) {
          revSnd.play();
          this.cycle.speed = 2;
          this.cycle.turbo -= 1;
          this.showTurbo();
        }
        break;

      case 16:
        if(this.cycle2.turbo > 0 && this.cycle2.speed === 1) {
          revSnd.play();
          this.cycle2.speed = 2;
          this.cycle2.turbo -= 1;
          this.showTurbo();
        }
        break;
    }
  }.bind(this), false);
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
};


Game.prototype.updateLightCycleRibbons = function () {
  var cycle1Crash = (!_.some(this.lightRibbons, [this.cycle.x, this.cycle.y]));
  var cycle2Crash = (!_.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]));

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
      for(var i = 1; i <= this.cycle.width; i++){
        this.lightRibbons.push([this.cycle2.x, this.cycle2.y + i]);
      }
        break;
      case 'down':
      for(i = 1; i <= this.cycle.width; i++){
        this.lightRibbons.push([this.cycle2.x, this.cycle2.y - i]);
      }
        break;
      case 'left':
      for(i = 1; i <= this.cycle.width; i++){
        this.lightRibbons.push([this.cycle2.x + i, this.cycle2.y]);
      }
        break;
      case 'right':
      for(i = 1; i <= this.cycle.width; i++){
        this.lightRibbons.push([this.cycle2.x - i, this.cycle2.y]);
      }
        break;

    }
    this.lightRibbons.push([this.cycle2.x, this.cycle2.y]);
  }

};

Game.prototype.playerCycleDirection = function () {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {

      case 65:

        setPlayerDirection(this.cycle, 'left');
        break;

      case 37:
        setPlayerDirection(this.cycle2, 'left');
        break;

      case 87:
        setPlayerDirection(this.cycle, 'up');
        break;
      case 38:
        setPlayerDirection(this.cycle2, 'up');
        break;

      case 68:
        setPlayerDirection(this.cycle, 'right');
        break;
      case 39:
        setPlayerDirection(this.cycle2, 'right');
        break;

      case 83:
        setPlayerDirection(this.cycle, 'down');
        break;
      case 40:
        setPlayerDirection(this.cycle2, 'down');
        break;
    }
  }.bind(this), false);
};

Game.prototype.moveCycles = function () {
  this.cycle.move(this.cycle.direction);
  this.cycle2.move(this.cycle2.direction);
};

function setPlayerDirection(player, direction) {
  player.speed = 1;
  player.direction = direction;
}

function renderButtons() {
  getCanvas.removeAttribute("class", "hidden");
  getInstructions.setAttribute("class", "hidden");
  getMovie.setAttribute("class", "hidden");
  getStartButton.setAttribute("class", "hidden");
}

module.exports = Game;
