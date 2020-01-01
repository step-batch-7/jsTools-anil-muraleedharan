'use strict';

const { deepStrictEqual, strictEqual, ok } = require('chai').assert;
const { fake } = require('sinon');
const { parseUserOptions, loadLines, cutFields } = require('../src/cutLib');

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

describe('loadLines', function() {
  const num = { zero: 0, one: 1, two: 2 };
  it('should load all the lines if the file exist', function(done) {
    const cutOptions = { path: './a.txt', delimiter: ',', fieldNum: 2 };
    const readFile = fake.yields('', 'abc');
    const onComplete = fake(() => {
      ok(onComplete.calledWithExactly('', 'abc'));
      strictEqual(readFile.firstCall.args[num.zero], './a.txt');
      strictEqual(readFile.firstCall.args[num.one], 'utf8');
      done();
    });
    loadLines(cutOptions, readFile, onComplete);
  });

  it('should give an error if the file does not exist', function(done) {
    const cutOptions = { path: './b.txt', delimiter: ',', fieldNum: 2 };
    const readFile = fake.yields('./b.txt: No such file or directory', '');
    const onComplete = fake(() => {
      strictEqual(readFile.firstCall.args[num.zero], './b.txt');
      strictEqual(readFile.firstCall.args[num.one], 'utf8');
      onComplete.calledWithExactly('./b.txt: No such file or directory', '');
      done();
    });
    loadLines(cutOptions, readFile, onComplete);
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
