const { deepStrictEqual } = require('chai').assert;
const {
  parseUserOptions,
  readFileContents,
  getFieldsList
} = require('../src/cutLib');

describe('parseUserOptions', function() {
  it('should give an object of required user Options', function() {
    const userOption = ['node', 'cut.js', '-d', ',', '-f', '2', './tmp1.txt'];
    const expected = {
      path: './tmp1.txt',
      fields: '2',
      delimiter: ','
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });
});

describe('readFileContents', function() {
  const fileReader = path => {
    return 'line1\nline2\nline3';
  };
  it('should read the contents of the file if it is exist and the file existence should be truthy', function() {
    deepStrictEqual(readFileContents(fileReader, 'path'), {
      fileExistence: true,
      contents: ['line1', 'line2', 'line3']
    });
  });
});

describe('getFieldsList', function() {
  it('should give an array of all the required fields if we give an array of fields range', function() {
    deepStrictEqual(getFieldsList('2,3,4'), [2, 3, 4]);
  });
});
