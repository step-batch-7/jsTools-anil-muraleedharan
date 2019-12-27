'use strict';

const { deepStrictEqual } = require('chai').assert;
const { fake, stub } = require('sinon');
const { cut } = require('../src/executeCut');

describe('cut', function() {
  const readFileSync = fake();
  const existsSync = fake();
  const readLines = stub();
  readLines.withArgs({ readFileSync, existsSync }, 'path').returns({
    lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
    error: ''
  });
  readLines.withArgs({ readFileSync, existsSync }, 'badFile.txt').returns({
    lines: '',
    error: 'badFile.txt: No such file or directory'
  });

  const parseUserOptions = stub();
  parseUserOptions.withArgs(['-d', ',', '-f', '2', 'path']).returns({
    delimiter: ',',
    fieldNum: 2,
    path: 'path'
  });
  parseUserOptions.withArgs(['-d', ',', '-f', '0', 'path']).returns({
    delimiter: ',',
    fieldNum: 0,
    path: 'path'
  });
  parseUserOptions.withArgs(['-d', ',', '-f', 'a', 'path']).returns({
    delimiter: ',',
    fieldNum: NaN,
    path: 'path'
  });
  parseUserOptions.withArgs(['-d', ',', '-f', '2', 'badFile.txt']).returns({
    delimiter: ',',
    fieldNum: 2,
    path: 'badFile.txt'
  });

  const cutFields = stub();
  cutFields
    .withArgs({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      fieldNum: 2,
      delimiter: ','
    })
    .returns({
      rows: ['def', 'mno', 'vwx', 'xyz'],
      fieldError: ''
    });
  cutFields
    .withArgs({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      fieldNum: 0,
      delimiter: ','
    })
    .returns({
      rows: [],
      fieldError: 'cut: [-cf] list: values may not include zero'
    });
  cutFields
    .withArgs({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      fieldNum: NaN,
      delimiter: ','
    })
    .returns({
      rows: [],
      fieldError: 'cut: [-cf] list: illegal list value'
    });

  it('should do the operation and return back a proper message if the file exist', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });

  it('should give an error if the given field is zero', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-d', ',', '-f', '0', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: values may not include zero'
    };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });

  it('should give an error if the given field is NaN', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-d', ',', '-f', 'a', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: illegal list value'
    };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });

  it('should give back an error message if the file does not exist', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-d', ',', '-f', '2', 'badFile.txt'];
    const expected = {
      message: '',
      error: 'badFile.txt: No such file or directory'
    };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });
});
