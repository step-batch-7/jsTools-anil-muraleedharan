const { strictEqual, deepStrictEqual } = require('chai').assert;
const { performCut } = require('../src/performCut');

describe('performCut', function() {
  it('should do the operation and return back a proper message if the file exist', function() {
    const userInputs = [
      'node',
      'cut.js',
      '-d',
      ',',
      '-f',
      '2',
      './appTests/tmp1.txt'
    ];
    const expected = { message: 'def\nmno\nvwx\nxyz' };
    deepStrictEqual(performCut(userInputs), expected);
  });

  it('should give back an error message if the file does not exist', function() {
    const userInputs = ['node', 'cut.js', '-d', ',', '-f', '2', 'badFile.txt'];
    const expected = { error: 'badFile.txt: No such file or directory' };
    deepStrictEqual(performCut(userInputs), expected);
  });
});
