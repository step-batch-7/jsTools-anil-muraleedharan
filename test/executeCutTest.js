'use strict';

const { deepStrictEqual } = require('chai').assert;
const { cut } = require('../src/executeCut');

describe('cut', function() {
  it('should do the operation and return back a proper message if the file exist', function() {
    const readFileSync = '';
    const existsSync = '';
    const readLines = ({ readFileSync, existsSync }, path) => ({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      error: ''
    });

    const cutFields = ({ lines, fieldNum, delimiter }) => ({
      rows: ['def', 'mno', 'vwx', 'xyz'],
      fieldError: ''
    });

    const parseUserOptions = cmdLineArgs => ({
      delimiter: ',',
      fieldNum: 2,
      path: 'path'
    });

    const cutLib = { parseUserOptions, readLines, cutFields };

    const options = ['-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync }, cutLib),
      expected
    );
  });

  it('should give an error if the given field is zero', function() {
    const readFileSync = '';
    const existsSync = '';

    const readLines = ({ readFileSync, existsSync }, path) => ({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      error: ''
    });

    const cutFields = ({ lines, fieldNum, delimiter }) => ({
      rows: [],
      fieldError: 'cut: [-cf] list: values may not include zero'
    });

    const parseUserOptions = cmdLineArgs => ({
      delimiter: ',',
      fieldNum: 2,
      path: 'path'
    });

    const cutLib = { parseUserOptions, readLines, cutFields };

    const options = ['-d', ',', '-f', '0', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: values may not include zero'
    };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync }, cutLib),
      expected
    );
  });

  it('should give an error if the given field is NaN', function() {
    const readFileSync = '';
    const existsSync = '';

    const readLines = ({ readFileSync, existsSync }, path) => ({
      lines: 'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz',
      error: ''
    });

    const cutFields = ({ lines, fieldNum, delimiter }) => ({
      rows: [],
      fieldError: 'cut: [-cf] list: illegal list value'
    });

    const parseUserOptions = cmdLineArgs => ({
      delimiter: ',',
      fieldNum: 2,
      path: 'path'
    });

    const cutLib = { parseUserOptions, readLines, cutFields };

    const options = ['-d', ',', '-f', 'a', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: illegal list value'
    };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync }, cutLib),
      expected
    );
  });

  it('should give back an error message if the file does not exist', function() {
    const readFileSync = '';
    const existsSync = '';

    const readLines = ({ readFileSync, existsSync }, path) => ({
      lines: '',
      error: 'badFile.txt: No such file or directory'
    });

    const cutFields = ({ lines, fieldNum, delimiter }) => ({
      rows: ['def', 'mno', 'vwx', 'xyz'],
      fieldError: ''
    });

    const parseUserOptions = cmdLineArgs => ({
      delimiter: ',',
      fieldNum: 2,
      path: 'path'
    });

    const cutLib = { parseUserOptions, readLines, cutFields };

    const options = ['-d', ',', '-f', '2', 'badFile.txt'];
    const expected = {
      message: '',
      error: 'badFile.txt: No such file or directory'
    };
    deepStrictEqual(
      cut(options, { readFileSync, existsSync }, cutLib),
      expected
    );
  });
});
