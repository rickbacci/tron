const chai     = require('chai');
const assert   = chai.assert;
const Cycle    = require('../lib/cycle.js');


describe('my test suite', function () {
  it('should work', function () {
    assert(true);
  });
});

describe('When the game starts there', function () {
  it('should be a cycle on the screen', function () {
    var cycle = new Cycle(10, 10, 15, 15, Cycle.canvas, Cycle.context);
    assert(cycle);
  });

});

describe('When the ', function () {
  it('up arrow is pressed the cycle should move up', function () {
    var cycle = new Cycle(10, 10, 15, 15, Cycle.canvas, Cycle.context);
    assert(cycle);
    assert.equal(cycle.y, 10);
    assert.equal(cycle.x, 10);

    cycle.move("up");
    assert.equal(cycle.y, 9);
  });

  it('down arrow is pressed the cycle should move down', function () {
    var cycle = new Cycle(10, 10, 15, 15, Cycle.canvas, Cycle.context);
    assert(cycle);
    assert.equal(cycle.y, 10);
    assert.equal(cycle.x, 10);

    cycle.move("down");
    assert.equal(cycle.y, 11);
  });

  it('left arrow is pressed the cycle should move left', function () {
    var cycle = new Cycle(10, 10, 15, 15, Cycle.canvas, Cycle.context);
    assert(cycle);
    assert.equal(cycle.y, 10);
    assert.equal(cycle.x, 10);

    cycle.move("left");
    assert.equal(cycle.x, 9);
  });

  it('right arrow is pressed the cycle should move right', function () {
    var cycle = new Cycle(10, 10, 15, 15, Cycle.canvas, Cycle.context);
    assert(cycle);
    assert.equal(cycle.y, 10);
    assert.equal(cycle.x, 10);

    cycle.move("right");
    assert.equal(cycle.x, 11);
  });

});


describe('Canvas boundries', function () {

  it('moves off the screen from left to right', function () {
    var cycle = new Cycle(0, 0, 10, 10, Cycle.canvas, Cycle.context);

    cycle.move("left");
    assert.equal(cycle.x, 800);
  });

  it('moves off the screen from right to left', function () {
    var cycle = new Cycle(800, 0, 10, 10, Cycle.canvas, Cycle.context);

    cycle.move("right");
    assert.equal(cycle.x, 0);
  });

  it('moves off the screen from top to bottom', function () {
    var cycle = new Cycle(0, 0, 10, 10, Cycle.canvas, Cycle.context);

    cycle.move("up");
    assert.equal(cycle.y, 450);
  });

  it('moves off the screen from bottom to top', function () {
    var cycle = new Cycle(0, 800, 10, 10, Cycle.canvas, Cycle.context);

    cycle.move('down');
    assert.equal(cycle.y, 0);
  });

  describe('Collision Detection', function (){

    it('cannot turn back in original direction', function () {
      var cycle = new Cycle(0, 0, 10, 10, Cycle.canvas, Cycle.context);
      cycle.move('right');
      cycle.move('left');

    });
  });

});
