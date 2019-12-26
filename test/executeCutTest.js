'use strict';

const { deepStrictEqual } = require('chai').assert;
const { cut } = require('../src/executeCut');

describe('cut', function() {
  const readFileSync = path =>
    'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz';
  const existsSync = path => path === 'path';
  const encoding = 'utf8';

  it('should do the operation and return back a proper message if the file exist', function() {
    const userInputs = ['-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    deepStrictEqual(
      cut(userInputs, { readFileSync, existsSync, encoding }),
      expected
    );
  });

  it('should give an error if the given field is zero', function() {
    const options = ['-d', ',', '-f', '0', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: values may not include zero'
    };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync, encoding }),
      expected
    );
  });

  it('should give an error if the given field is NaN', function() {
    const options = ['-d', ',', '-f', 'a', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: illegal list value'
    };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync, encoding }),
      expected
    );
  });

  it('should give back an error message if the file does not exist', function() {
    const userInputs = ['-d', ',', '-f', '2', 'badFile.txt'];
    const expected = {
      message: '',
      error: 'badFile.txt: No such file or directory'
    };
    deepStrictEqual(
      cut(userInputs, { readFileSync, existsSync, encoding }),
      expected
    );
  });
});
