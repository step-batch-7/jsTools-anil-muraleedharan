const { deepStrictEqual } = require('chai').assert;
const { parseUserOptions, readFileContents } = require('../src/cutLib');

describe('parseUserOptions', function() {
  it('should give an object of required user Options', function() {
    const userOption = [
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
    deepStrictEqual(parseUserOptions(userOption), expected);
  });

  it('should give an object of required user Options when the path is not specified', function() {
    const userOption = ['node', 'cut.js', '-f', '1-2,4,5', '-d', ','];
    const expected = {
      fields: ['1-2', '4', '5'],
      delimiter: ','
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });
});

describe('readFileContents', function() {
  const existenceChecker = path => path === 'path';
  const fileReader = path => {
    return 'line1\nline2\nline3';
  };
  it('should read the contents of the file if it is exist and the file existence should be truthy', function() {
    deepStrictEqual(readFileContents(fileReader, existenceChecker, 'path'), {
      fileExistence: true,
      contents: ['line1', 'line2', 'line3']
    });
  });

  it('should read ', function() {
    deepStrictEqual(
      readFileContents(fileReader, existenceChecker, 'wrong path'),
      {
        fileExistence: false,
        contents: []
      }
    );
  });
});
