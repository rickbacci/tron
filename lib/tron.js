const $       = require('jquery');
const _       = require('lodash');
const Cycle   = require('./cycle');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var color     = "#2BE7FA";
var color2    = "#FDAA02";
var tronFont  = '60px tron';
var wall      = [];
var snd = new Audio("explosion.mp3");


var cycleSize = 2;

var cycle     = new Cycle(10, 225, cycleSize, cycleSize, canvas, context, color,'right', 5, 0);
var cycle2    = new Cycle(790, 225, cycleSize, cycleSize, canvas, context, color2, 'left', 5, 0);


function gameLoop() {
  document.getElementById('canvas').removeAttribute("class", "hidden")
  // document.querySelector("#canvas").style.backgroundImage = 'url(tronbg.jpg)';
  document.getElementById('start-game').setAttribute("class", "hidden")
  document.getElementById('instructions').setAttribute("class", "hidden")
  document.getElementById('movie').setAttribute("class", "hidden")
  updateWalls(cycle);
  updateWalls(cycle2);

  cycle.move(cycle.direction).draw();
  cycle2.move(cycle2.direction).draw();

  if (collisionCheck(cycle)){
    return showWinner(context, color2, 2, cycle2)

  }
  else if(collisionCheck(cycle2)){
    return showWinner(context, color, 1, cycle)

  }
  requestAnimationFrame(gameLoop);
};


function showWinner(context, color, num, player) {
  snd.play();
  context.font      = tronFont;
  context.fillStyle = color;
  context.fillText("Player " + num + " Wins!", 150, 190);
  player.score += 1;
  showScore(cycle, cycle2);
  document.getElementById('reset-button').removeAttribute("class")
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
}

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

      case 81:
      if(cycle.turbo > 0 && cycle.speed < 2){
        cycle.speed = 2
        cycle.turbo -= 1
      }
      showTurbo(cycle, cycle2)
      break;
      case 16:

      if(cycle2.turbo > 0 && cycle.speed < 2){
        cycle2.speed = 2
        cycle2.turbo -= 1
      }
      showTurbo(cycle, cycle2)
    }
  }, false);
}

function playerSpeed(player, direction) {
  if(player.speed == 2) {
    player.speed = 1;
  }
  player.direction = direction;
}

function showTurbo(player1, player2) {
  var turboDiv1 = document.getElementById('turbo1')
  var turboDiv2 = document.getElementById('turbo2')

// _.times(player1.turbo/2, function () {
  turboDiv1.innerHTML = "<span class='turbo'>Turbo</span>   " + _.times(player1.turbo, function () {return "."}).join("")
// })

// _.times(player2.turbo/2, function () {
  turboDiv2.innerHTML =  _.times(player2.turbo, function () {return "."}).join("") + "   <span class='turbo'>Turbo</span>"
// })
}

function showScore(player1, player2) {
  var scoreDiv1 = document.getElementById('score1')
  var scoreDiv2 = document.getElementById('score2')


  scoreDiv1.innerHTML = player1.score

  scoreDiv2.innerHTML = player2.score
}

var resetGame = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  wall = [];
  cycle.x = 10
  cycle.y = 225
  cycle2.x = 790
  cycle2.y = 225
  cycle.direction = "right"
  cycle2.direction = "left"
  cycle.speed = 1
  cycle2.speed = 1
  cycle.turbo = 5
  cycle2.turbo = 5
  document.getElementById('start-game').removeAttribute("class", "hidden")
  document.getElementById('instructions').removeAttribute("class", "hidden")
document.getElementById('canvas').setAttribute("class", "hidden")
document.getElementById('movie').removeAttribute("class", "hidden")
  // document.querySelector("#canvas").style.backgroundImage = 'url(sidetron.jpg)';
  // gameStart();
  clearGame();
}

function gameStart() {
  showTurbo(cycle, cycle2);

  document.getElementById('reset-button').setAttribute("class", "hidden")


}

function clearGame() {
  document.getElementById('reset-button').setAttribute("class", "hidden")
  context.clearRect(0, 0, canvas.width, canvas.height);
  showTurbo(cycle, cycle2);
  gameLoop();
}

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
  // } else if(event.keyCode === 32) {
  //   clearGame();
  // }
  } else if (event.keyCode==13){
    this.getElementById('audio').pause();
  }
});

// document.addEventListener("keypress", function(event) {
//   if (event.keyCode === 32) {
//     clearGame();
//   }
// });
// document.getElementById('instructions').addEventListener('click', clearGame , false);
