const chai = require('chai');
const assert = chai.assert;
const Block = require('../lib/block.js');
const $ = require('jquery')


describe('my test suite', function () {
  it('should work', function () {
    assert(true);
  });
});

describe('When the game starts there', function () {
  it('should be a block on the screen', function () {
    var block = new Block(10, 10, 15, 15, Block.canvas, Block.context);
    assert(block);
  });

});

describe('When the ', function () {
  it('up arrow is pressed the block should move up', function () {
    var block = new Block(10, 10, 15, 15, Block.canvas, Block.context);
    assert(block);
    assert.equal(block.y, 10)
    assert.equal(block.x, 10)

    block.move("up")
    assert.equal(block.y, 9)
  });

  it('the block should move down', function () {
    var block = new Block(10, 10, 15, 15, Block.canvas, Block.context);
    assert(block);
    assert.equal(block.y, 10)
    assert.equal(block.x, 10)

    block.move("down")
    assert.equal(block.y, 11)
  });

  it('the block should move left', function () {
    var block = new Block(10, 10, 15, 15, Block.canvas, Block.context);
    assert(block);
    assert.equal(block.y, 10)
    assert.equal(block.x, 10)

    block.move("left")
    assert.equal(block.x, 9)
  });

  it('the block should move right', function () {
    var block = new Block(10, 10, 15, 15, Block.canvas, Block.context);
    assert(block);
    assert.equal(block.y, 10)
    assert.equal(block.x, 10)

    block.move("right")
    assert.equal(block.x, 11)
  });

});


describe('Canvas boundries', function () {

  it('moves off the screen from left to right', function () {
    var block = new Block(0, 0, 10, 10, Block.canvas, Block.context);

    block.move("left")
    assert.equal(block.x, 600)
  });

  it('moves off the screen from right to left', function () {
    var block = new Block(600, 0, 10, 10, Block.canvas, Block.context);

    block.move("right")
    assert.equal(block.x, 0)
  });

  it('moves off the screen from top to bottom', function () {
    var block = new Block(0, 0, 10, 10, Block.canvas, Block.context);

    block.move("up")
    assert.equal(block.y, 400)
  });

  it('moves off the screen from bottom to top', function () {
    var block = new Block(0, 600, 10, 10, Block.canvas, Block.context);

    block.move('down')
    assert.equal(block.y, 0)
  });

  describe('Collision Detection', function (){

    it('cannot turn back in original direction', function () {
      var block = new Block(0, 0, 10, 10, Block.canvas, Block.context);
      block.move('right');
      block.move('left');

    });
  });
});
