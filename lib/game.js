const Cycle         = require ('./cycle');
const _             = require('lodash');

var EventEmitter    = require('events');
var e               = new EventEmitter();
var revSnd          = new Audio("media/rev.mp3");
var getCanvas       = document.getElementById('canvas');
var getInstructions = document.getElementById('instructions');
var getMovie        = document.getElementById('movie');
var getStartButton  = document.getElementById('start-game');


class Game extends EventEmitter {
  constructor() {
    super();
    this.cycle        = new Cycle(10, 225, 1, "#2BE7FA",'right');
    this.cycle2       = new Cycle(790, 225, 2, "#FDAA02", 'left');
    this.lightRibbons = [];
    this.winner       = "";
    this.loser        = "";
    this.state        = "started";
  }

  start() {
    this.showTurbo();
    this.showScore();
    this.playerTurbosRemaining();
    this.updateLightCycleRibbons();
    this.playerCycleDirection();
    this.moveCycles();
    renderButtons();

  }

  collision(player) {
    var location;
    var cycleNum = player.number;
    var i;

    if(player.speed === 2) {
      switch (player.direction) {

        case 'up':
          for(i = 0; i <= 1; i++) {
            location = _.some(this.lightRibbons, [player.x, player.y + i]);
            this.declareWinner(location, cycleNum);
          }
          break;

        case 'down':
          for(i = 0; i <= 1; i++) {
            location = _.some(this.lightRibbons, [player.x, player.y - i]);
            this.declareWinner(location, cycleNum);
          }
          break;

        case 'left':
          for(i = 0; i <= 1; i++) {
            location = _.some(this.lightRibbons, [player.x + i, player.y]);
            this.declareWinner(location, cycleNum);
          }
          break;

        case 'right':
          for(i = 0; i <= 1; i++) {
            location = _.some(this.lightRibbons, [player.x - i, player.y]);
            this.declareWinner(location, cycleNum);
          }
          break;
      }
    }

    location = _.some(this.lightRibbons, [player.x, player.y]);
    this.declareWinner(location, cycleNum);

  }

  declareWinner(location, cycleNum) {
    if(location) {
      if(cycleNum === 2){
        this.winner = this.cycle;
        this.loser  = this.cycle2;
      }
      if(cycleNum === 1){
        this.winner = this.cycle2;
        this.loser  = this.cycle;
      }
      this.state = "game over";
      e.emit('crashed');
      return this.state = "game over";
    } else {
      return false;
    }
  }

  playerTurbosRemaining() {
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
  }

  showTurbo() {
    var turboDiv1       = document.getElementById('turbo1');
    var turboDiv2       = document.getElementById('turbo2');

    turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " +
      _.times(this.cycle.turbo, function () {return ".";}).join("");
      turboDiv2.innerHTML = _.times(this.cycle2.turbo, function () {return ".";})
      .join("") + "   <span class='turbo'>Turbo</span>";
  }

  showScore() {
    var scoreDiv1       = document.getElementById('score1');
    var scoreDiv2       = document.getElementById('score2');

    scoreDiv1.innerHTML = this.cycle.score;
    scoreDiv2.innerHTML = this.cycle2.score;
  }

  updateLightCycleRibbons() {
    var cycle1Crash = (!_.some(this.lightRibbons, [this.cycle.x, this.cycle.y]));
    var cycle2Crash = (!_.some(this.lightRibbons, [this.cycle2.x, this.cycle2.y]));

    this.updateNoCrash(cycle1Crash, this.cycle);
    this.updateNoCrash(cycle2Crash, this.cycle2);

  }

  updateNoCrash(noCrash, player) {
    if (noCrash) {
      switch (player.direction) {
        case 'up':
          this.lightRibbons.push([player.x, player.y + 1]);
          break;

        case 'down':
          this.lightRibbons.push([player.x, player.y - 1]);
          break;

        case 'left':
          this.lightRibbons.push([player.x + 1, player.y]);
          break;

        case 'right':
          this.lightRibbons.push([player.x - 1, player.y]);
          break;

      }
      this.lightRibbons.push([player.x, player.y]);
    }

  }

  playerCycleDirection() {
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

  }

  moveCycles() {
    this.cycle.move(this.cycle.direction);
    this.cycle2.move(this.cycle2.direction);
  }

}


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


module.exports = {
  Game: Game,
  e:    e

};
