const chai     = require('chai');
const assert   = chai.assert;
// const Cycle    = require('../lib/cycle.js');
const Game     = require('../lib/game.js');
const _        = require('lodash')


describe('Movement', function () {
  it('Cycles can move up', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 225);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 225);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("up");

    assert.equal(game.cycle.y, 224);

    game.cycle2.move("up");

    assert.equal(game.cycle.y, 224);
  });


  it('Cycles can move down', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 225);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 225);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("down");
    assert.equal(game.cycle.y, 226);

    game.cycle2.move("down");

    assert.equal(game.cycle2.y, 226);
  });

  it('Cycles can  move left', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 225);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 225);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("left");

    assert.equal(game.cycle.x, 9);

    game.cycle2.move("left");

    assert.equal(game.cycle2.x, 789);
  });

  it('Cycles can move right', function () {
    var game = new Game();

    assert.equal(game.cycle.y, 225);
    assert.equal(game.cycle.x, 10);

    assert.equal(game.cycle2.y, 225);
    assert.equal(game.cycle2.x, 790);


    game.cycle.move("right");

    assert.equal(game.cycle.x, 11);

    game.cycle2.move("right");

    assert.equal(game.cycle2.x, 791);
  });

  it('Cycles can move muliple spaces in any direction', function () {
    var game = new Game();

    _.times(10, function () {game.cycle.move("right");});
    assert.equal(game.cycle.x, 20);

    _.times(20, function () {game.cycle.move("down");});
    assert.equal(game.cycle.y, 245);
  });

  it('Cycles can move muliple spaces in any direction using turbo', function () {
    var game = new Game();
    game.cycle.speed = 2;
    game.cycle2.speed = 2;

    _.times(10, function () {game.cycle.move("right");});
    assert.equal(game.cycle.x, 30);

    _.times(20, function () {game.cycle.move("down");});
    assert.equal(game.cycle.y, 265);
  });
});
