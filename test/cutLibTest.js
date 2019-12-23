const { deepStrictEqual } = require('chai').assert;
const { parseUserOptions } = require('../src/cutLib');

describe('parseUserOptions', function() {
  it('should give an object of required user Options', function() {
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
    deepStrictEqual(parseUserOptions(userInput), expected);
  });

  it('should give an object of required user Options when the path is not specified', function() {
    const userOptions = ['node', 'cut.js', '-f', '1-2,4,5', '-d', ','];
    const expected = {
      fields: ['1-2', '4', '5'],
      delimiter: ','
    };
    deepStrictEqual(parseUserOptions(userOptions), expected);
  });
});
