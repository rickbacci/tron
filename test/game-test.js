const chai     = require('chai');
const assert   = chai.assert;
const Game     = require('../lib/game.js').Game;
const Cycle    = require('../lib/cycle.js');


describe('Game Start', function () {
  it('Creates a new game', function() {
    var game = new Game();
    assert(game);
  });

  it('Two cycles are created', function () {
    var game = new Game();

    assert(game.cycle);
    assert(game.cycle2);
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



});

describe('Collision Detection', function (){

  it('cannot turn back in original direction', function () {
    var game = new Game();


    game.cycle.move('right');
    game.cycle.move('left');

    game.updateLightCycleRibbons();

    assert.equal(game.state, "started");

    game.collision(game.cycle);

    assert.equal(game.state, "game over");
  });

  it('returns collision when 2 cycles meet', function (){
    var game = new Game();

    game.lightRibbons.push([game.cycle.x, game.cycle.y]);
    game.cycle2.x = game.cycle.x;
    game.cycle2.y = game.cycle.y;

    assert.equal(game.state, "started");

    game.collision(game.cycle2);

    assert.equal(game.state, "game over");
  });

  it('returns collision when using turbo speed', function() {
    var game = new Game();

    game.cycle.speed = 2;
    game.cycle.move("left");
    game.updateLightCycleRibbons();

    assert.equal(game.state, "started");

    game.collision(game.cycle);

    assert.equal(game.state, "game over");
  });

  it('returns collision when both cycles using turbo speed', function() {
    var game = new Game();


    game.cycle.speed = 2;
    game.cycle2.speed = 2;
    game.cycle.move("left");
    game.cycle2.move("left");
    game.updateLightCycleRibbons();

    assert.equal(game.state, "started");

    game.collision(game.cycle);

    assert.equal(game.state, "game over");
  });

  it('does not return a collision when cycles do not cross paths', function() {
    var game = new Game();

    game.updateLightCycleRibbons();

    game.cycle.move("up");
    game.cycle2.move("down");
    game.collision(game.cycle2);

    assert.equal(game.state, "started");
  });

  it('updates light cycles ribbons', function () {
    var game = new Game();

    game.cycle.move("up");
    game.cycle2.move("down");
    game.updateLightCycleRibbons();

    assert.equal(game.lightRibbons.length, 5);
  });

});
