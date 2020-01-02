'use strict';

const { strictEqual, ok } = require('chai').assert;
const { fake, stub } = require('sinon');
const { cut } = require('../src/executeCut');

describe('cut - Integration Test', () => {
  const num = { zero: 0, one: 1, two: 2 };
  it('should cut if the given options are proper', done => {
    const userArgs = ['-d', ',', '-f', '2', './a.txt'];
    const readFile = fake.yields('', 'abc');
    const onComplete = fake(() => {
      ok(onComplete.calledWithExactly('', 'abc'));
      strictEqual(readFile.firstCall.args[num.zero], './a.txt');
      strictEqual(readFile.firstCall.args[num.one], 'utf8');
      done();
    });
    cut({ userArgs, readFile }, onComplete);
  });

  it('should cut if the -d -f options are in reverse order', done => {
    const userArgs = ['-f', '2', '-d', ',', './a.txt'];
    const readFile = fake.yields('', 'abc');
    const onComplete = fake(() => {
      ok(onComplete.calledWithExactly('', 'abc'));
      strictEqual(readFile.firstCall.args[num.zero], './a.txt');
      strictEqual(readFile.firstCall.args[num.one], 'utf8');
      done();
    });
    cut({ userArgs, readFile }, onComplete);
  });

  it('should give an error if the given file does not exist', done => {
    const userArgs = ['-d', ',', '-f', '2', './b.txt'];
    const readFile = fake.yields('./b.txt: No such file or directory', '');
    const onComplete = fake(() => {
      ok(
        onComplete.calledWithExactly('./b.txt: No such file or directory', '')
      );
      strictEqual(readFile.firstCall.args[num.zero], './b.txt');
      strictEqual(readFile.firstCall.args[num.one], 'utf8');
      done();
    });
    cut({ userArgs, readFile }, onComplete);
  });

  it('should give an error if the given fileNum is zero', done => {
    const userArgs = ['-d', ',', '-f', '0', './a.txt'];
    const readFile = fake();
    const onComplete = fake(() => {
      ok(
        onComplete.calledWithExactly(
          'cut: [-cf] list: values may not include zero',
          ''
        )
      );
      ok(readFile.notCalled);
      done();
    });
    cut({ userArgs, readFile }, onComplete);
  });

  it('should give an error if the given fileNum is not a number', done => {
    const userArgs = ['-d', ',', '-f', 'a', './a.txt'];
    const readFile = fake();
    const onComplete = fake(() => {
      ok(
        onComplete.calledWithExactly('cut: [-cf] list: illegal list value', '')
      );
      ok(readFile.notCalled);
      done();
    });
    cut({ userArgs, readFile }, onComplete);
  });
});

const parseUserOptions = stub();
parseUserOptions.withArgs(['-d', ',', '-f', '2', './a.txt']).returns({
  cutOptions: { delimiter: ',', fieldNum: 2, path: './a.txt' },
  fieldError: ''
});
parseUserOptions.withArgs(['-d', ',', '-f', '2', './b.txt']).returns({
  cutOptions: { delimiter: ',', fieldNum: 2, path: './b.txt' },
  fieldError: ''
});
parseUserOptions.withArgs(['-d', ',', '-f', '0', './a.txt']).returns({
  cutOptions: { delimiter: ',', fieldNum: 0, path: './b.txt' },
  fieldError: 'cut: [-cf] list: values may not include zero'
});
parseUserOptions.withArgs(['-d', ',', '-f', 'a', './a.txt']).returns({
  cutOptions: { delimiter: ',', fieldNum: NaN, path: './b.txt' },
  fieldError: 'cut: [-cf] list: illegal list value'
});

describe('cut - Unit Test', function() {
  it('should work properly if all the options given are proper', function() {
    const userArgs = ['-d', ',', '-f', '2', './a.txt'];

    const loadLines = fake(() => {
      ok(
        loadLines.calledWithExactly(
          { delimiter: ',', fieldNum: 2, path: './a.txt' },
          readFile,
          onComplete
        )
      );
    });

    const onComplete = fake(() => {
      ok(onComplete.calledWithExactly('', 'abc'));
    });
    const readFile = stub();
    readFile.withArgs('./a.txt', 'utf8', onComplete).returns('abc');

    const cutLib = { parseUserOptions, loadLines };
    cut({ userArgs, readFile }, onComplete, cutLib);
  });
});
