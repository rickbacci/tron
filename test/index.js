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
