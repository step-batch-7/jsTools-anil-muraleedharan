const { strictEqual, deepStrictEqual } = require('chai').assert;
const {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
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
  const fileReader = path => 'line1\nline2\nline3';
  const existenceChecker = path => path === 'path';
  const encoding = 'utf8';

  it('should read the contents of the file if it is exist and the file existence should be truthy', function() {
    deepStrictEqual(
      readFileContents({
        fileReader,
        existenceChecker,
        encoding,
        path: 'path'
      }),
      {
        fileExistence: true,
        contents: ['line1', 'line2', 'line3']
      }
    );
  });

  it('should give the the existence as a falsy value when the file does not exist', function() {
    deepStrictEqual(
      readFileContents({
        fileReader,
        existenceChecker,
        encoding,
        path: 'other path'
      }),
      {
        fileExistence: false
      }
    );
  });
});

describe('getFieldsList', function() {
  it('should give an array of all the required fields if we give an array of fields range', function() {
    deepStrictEqual(getFieldsList('2'), [2]);
  });
});

describe('getRequiredFields', function() {
  it('should give an array of all the required fields in each line', function() {
    deepStrictEqual(getRequiredFields(['ab,cd', 'ef,gh'], [1], ','), [
      ['ab'],
      ['ef']
    ]);
  });

  it('should give the whole line if the line contains only one field', function() {
    deepStrictEqual(getRequiredFields(['ab,cd', 'ef,gh', 'ij'], [2], ','), [
      ['cd'],
      ['gh'],
      ['ij']
    ]);
  });
});

describe('generateMessage', function() {
  it('should generate a proper message to print depends on the field contents and delimiter', function() {
    strictEqual(generateMessage([['ab'], ['ef']], ','), 'ab\nef');
  });
});
