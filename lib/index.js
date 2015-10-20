const Block = require('./block.js');

var canvas    = document.getElementById('canvas');
var context   = canvas.getContext('2d');
var direction = '';


var block = new Block(10,10, 15, 15, canvas, context);

// var block2 = new Block(200, 200, 15, 15,canvas, context);

requestAnimationFrame(function gameLoop() {
  // context.clearRect(0, 0, canvas.width, canvas.height);

  // block2.move(direction).draw();
  block.move(direction).draw();
  requestAnimationFrame(gameLoop);
});



window.onload = function() {

   document.addEventListener('keydown', function(event) {
   direction = getDirection(event)
  }, false);

}



function getDirection(event) {
  switch (event.keyCode) {
    case 37:
      console.log('left')
      return 'left'
      break;
    case 38:
      console.log('up')
      return 'up'
      break;
    case 39:
      console.log('right')
      return 'right'
      break;
    case 40:
      console.log('down')
      return 'down'
      break;
  }

}

// Block.prototype.draw = function () {
//
//   this.context.fillRect(this.x, this.y, this.width, this.height);
//   this.context.fillStyle="#31FDE8";
//   return this;
// };

// Block.prototype.move = function (direction) {
//
//   switch (direction) {
//     case 'up':
//       this.y--;
//       break;
//     case 'down':
//       this.y++;
//       break;
//     case 'left':
//       this.x--;
//       break;
//     case 'right':
//       this.x++;
//       break;
//   }
//   return this;
// };
