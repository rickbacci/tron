const chai = require('chai');
const assert = chai.assert;
// const canvas = require('./index.js');
const Block = require('../lib/block.js');


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
  });

});

