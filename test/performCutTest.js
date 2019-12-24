const { strictEqual, deepStrictEqual } = require('chai').assert;
const { performCut } = require('../src/performCut');

describe('performCut', function() {
  const fileReader = path =>
    'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz';
  const existenceChecker = path => path === 'path';
  const encoding = 'utf8';

  it('should do the operation and return back a proper message if the file exist', function() {
    const userInputs = ['node', 'cut.js', '-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    deepStrictEqual(
      performCut(userInputs, { fileReader, existenceChecker, encoding }),
      expected
    );
  });

  it('should give back an error message if the file does not exist', function() {
    const userInputs = ['node', 'cut.js', '-d', ',', '-f', '2', 'badFile.txt'];
    const expected = {
      message: '',
      error: 'badFile.txt: No such file or directory'
    };
    deepStrictEqual(
      performCut(userInputs, { fileReader, existenceChecker, encoding }),
      expected
    );
  });
});
