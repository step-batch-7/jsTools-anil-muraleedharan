const { deepStrictEqual } = require('chai').assert;
const { parseUserInputs } = require('../src/cutLib');

describe('parseUserInputs', function() {
  it('should give an object of required user inputs', function() {
    const userInput = [
      'node',
      'cut.js',
      '-f',
      '1-2,4,5',
      '-d',
      ',',
      './tmp1.txt'
    ];
    const expected = {
      path: './tmp1.txt',
      fields: ['1-2', '4', '5'],
      delimiter: ','
    };
    deepStrictEqual(parseUserInputs(userInput), expected);
  });

  it('should give an object of required user inputs when the path is not specified', function() {
    const userInput = ['node', 'cut.js', '-f', '1-2,4,5', '-d', ','];
    const expected = {
      fields: ['1-2', '4', '5'],
      delimiter: ','
    };
    deepStrictEqual(parseUserInputs(userInput), expected);
  });
});
