'use strict';

const { deepStrictEqual } = require('chai').assert;
const { fake, stub } = require('sinon');
const { cut } = require('../src/executeCut');

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
  fieldError: '',
  cutOptions: {
    path: 'path',
    fieldNum: 2,
    delimiter: ','
  }
});

parseUserOptions.withArgs(['-f', '2', '-d', ',', 'path']).returns({
  fieldError: '',
  cutOptions: {
    path: 'path',
    fieldNum: 2,
    delimiter: ','
  }
});
parseUserOptions.withArgs(['-d', ',', '-f', '0', 'path']).returns({
  fieldError: 'cut: [-cf] list: values may not include zero',
  cutOptions: {
    path: 'path',
    fieldNum: 0,
    delimiter: '\t'
  }
});
parseUserOptions.withArgs(['-d', ',', '-f', 'a', 'path']).returns({
  fieldError: 'cut: [-cf] list: illegal list value',
  cutOptions: {
    path: 'path',
    fieldNum: NaN,
    delimiter: '\t'
  }
});
parseUserOptions.withArgs(['-d', ',', '-f', '2', 'badFile.txt']).returns({
  fieldError: '',
  cutOptions: {
    path: 'badFile.txt',
    fieldNum: 2,
    delimiter: ','
  }
});

const cutFields = stub();
cutFields
  .withArgs({
    lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
    fieldNum: 2,
    delimiter: ','
  })
  .returns(['def', 'mno', 'vwx', 'xyz']);

describe('cut - Unit Level', function() {
  it('should give a proper message if the file exist', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });

  it('should give a proper message if options in reverse order', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-f', '2', '-d', ',', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync }, cutLib);
    deepStrictEqual(actual, expected);
  });

  it('should give a proper message if options in reverse order', function() {
    const cutLib = { parseUserOptions, readLines, cutFields };
    const options = ['-f', '2', '-d', ',', 'path'];
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

  it('should give an error message if the file does not exist', function() {
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

describe('cut - Integration Test', function() {
  const readFileSync = fake.returns(
    'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz'
  );

  const existsSync = stub();
  existsSync.withArgs('path').returns(true);
  existsSync.withArgs('badFile.txt').returns(false);

  it('should give a proper message if the file exist', function() {
    const options = ['-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });

  it('should give a proper message if options in reverse order', function() {
    const options = ['-f', '2', '-d', ',', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });

  it('should give a proper message if options in reverse order', function() {
    const options = ['-f', '2', '-d', ',', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });

  it('should give an error if the given field is zero', function() {
    const options = ['-d', ',', '-f', '0', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: values may not include zero'
    };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });

  it('should give an error if the given field is NaN', function() {
    const options = ['-d', ',', '-f', 'a', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: illegal list value'
    };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });

  it('should give an error message if the file does not exist', function() {
    const options = ['-d', ',', '-f', '2', 'badFile.txt'];
    const expected = {
      message: '',
      error: 'badFile.txt: No such file or directory'
    };
    const actual = cut(options, { readFileSync, existsSync });
    deepStrictEqual(actual, expected);
  });
});
