'use strict';

const { deepStrictEqual } = require('chai').assert;
const { fake, stub } = require('sinon');
const { parseUserOptions, readLines, cutFields } = require('../src/cutLib');

describe('parseUserOptions', function() {
  it('should give an object of required user Options', function() {
    const userOption = ['-d', ',', '-f', '2', './tmp1.txt'];
    const expected = {
      fieldError: '',
      cutOptions: {
        path: './tmp1.txt',
        fieldNum: 2,
        delimiter: ','
      }
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });

  it('should work if -f and -d are in reverse order', function() {
    const userOption = ['-f', '2', '-d', ',', './tmp1.txt'];
    const expected = {
      fieldError: '',
      cutOptions: {
        path: './tmp1.txt',
        fieldNum: 2,
        delimiter: ','
      }
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });

  it('should apply default if -d is not present', function() {
    const userOption = ['-f', '2', './tmp1.txt'];
    const expected = {
      fieldError: '',
      cutOptions: {
        path: './tmp1.txt',
        fieldNum: 2,
        delimiter: '\t'
      }
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });

  it('should give a filedError if FieldNum is zero', function() {
    const userOption = ['-f', '0', './tmp1.txt'];
    const expected = {
      fieldError: 'cut: [-cf] list: values may not include zero',
      cutOptions: {
        path: './tmp1.txt',
        fieldNum: 0,
        delimiter: '\t'
      }
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });

  it('should give a filedError if FieldNum not a number', function() {
    const userOption = ['-f', 'a', './tmp1.txt'];
    const expected = {
      fieldError: 'cut: [-cf] list: illegal list value',
      cutOptions: {
        path: './tmp1.txt',
        fieldNum: NaN,
        delimiter: '\t'
      }
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });
});

describe('readLines', function() {
  const readFileSync = fake.returns('line1\nline2\nline3');
  const existsSync = stub();
  existsSync.withArgs('path').returns(true);
  existsSync.withArgs('other path').returns(false);

  const encoding = 'utf8';

  it('should read the lines of the file if it is exist', function() {
    deepStrictEqual(
      readLines(
        {
          readFileSync,
          existsSync,
          encoding
        },
        'path'
      ),
      {
        lines: ['line1', 'line2', 'line3'],
        error: ''
      }
    );
  });

  it('should give the error if the file does not exist', function() {
    deepStrictEqual(
      readLines(
        {
          readFileSync,
          existsSync,
          encoding
        },
        'other path'
      ),
      {
        lines: [],
        error: 'other path: No such file or directory'
      }
    );
  });
});

describe('cutFields', function() {
  it('should give an array of all the  fields in each line', function() {
    deepStrictEqual(
      cutFields({ lines: ['ab,cd', 'ef,gh'], fieldNum: 1, delimiter: ',' }),
      ['ab', 'ef']
    );
  });

  it('should give the whole line if it contains only one field', function() {
    deepStrictEqual(
      cutFields({
        lines: ['ab,cd', 'ef,gh', 'ij'],
        fieldNum: 2,
        delimiter: ','
      }),
      ['cd', 'gh', 'ij']
    );
  });

  it('should give empty if the given field exceeds total fields', function() {
    deepStrictEqual(
      cutFields({
        lines: ['ab,cd,ef', 'ef,gh', 'ij,kl'],
        fieldNum: 3,
        delimiter: ','
      }),
      ['ef', '', '']
    );
  });
});
