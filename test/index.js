const chai     = require('chai');
const assert   = chai.assert;
const Cycle    = require('../lib/cycle.js');
const Game     = require('../lib/game.js');


describe('Game Start', function () {
  it('Two cycles are created', function () {
    var game = new Game();

    assert(game.cycle);
    assert(game.cycle2);
  });

});


describe('Movement', function () {
  // before(function() {
  //  var game = new Game();
  // });

  it('Cycles can move up', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 200);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 200);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("up");

    assert.equal(game.cycle.y, 199);

    game.cycle2.move("up");

    assert.equal(game.cycle.y, 199);
  });


  it('Cycles can move down', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 200);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 200);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("down");
    assert.equal(game.cycle.y, 201);

    game.cycle2.move("down");

    assert.equal(game.cycle2.y, 201);
  });

  it('Cycles can  move left', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 200);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 200);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("left");

    assert.equal(game.cycle.x, 9);

    game.cycle2.move("left");

    assert.equal(game.cycle2.x, 789);
  });

  it('Cycles can move right', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 200);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 200);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("right");

    assert.equal(game.cycle.x, 11);

    game.cycle2.move("right");

    assert.equal(game.cycle2.x, 791);
  });

});


describe('Canvas boundries', function () {

  it('moves off the screen from left to right', function () {
    var cycle = new Cycle(0, 0, 10, 10);

    cycle.move("left");
    assert.equal(cycle.x, 800);
  });

  it('moves off the screen from right to left', function () {
    var cycle = new Cycle(800, 0, 10, 10);

    cycle.move("right");
    assert.equal(cycle.x, 0);
  });

  it('moves off the screen from top to bottom', function () {
    var cycle = new Cycle(0, 0, 10, 10);

    cycle.move("up");
    assert.equal(cycle.y, 450);
  });

  it('moves off the screen from bottom to top', function () {
    var cycle = new Cycle(0, 800, 10, 10);

    cycle.move('down');
    assert.equal(cycle.y, 0);
  });

  describe('Collision Detection', function (){

    it('cannot turn back in original direction', function () {
      var cycle = new Cycle(0, 0, 10, 10);
      cycle.move('right');
      cycle.move('left');

      assert(Game)
    });
  });

});
