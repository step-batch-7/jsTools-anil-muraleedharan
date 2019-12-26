const { deepStrictEqual } = require('chai').assert;
const {
  parseUserOptions,
  readLines,
  cut,
  getFields
} = require('../src/cutLib');

describe('parseUserOptions', function() {
  it('should give an object of required user Options', function() {
    const userOption = ['node', 'cut.js', '-d', ',', '-f', '2', './tmp1.txt'];
    const expected = {
      path: './tmp1.txt',
      fieldNo: 2,
      delimiter: ','
    };
    deepStrictEqual(parseUserOptions(userOption), expected);
  });
});

describe('readLines', function() {
  const fileReader = path => 'line1\nline2\nline3';
  const existenceChecker = path => path === 'path';
  const encoding = 'utf8';

  it('should read the lines of the file if it is exist and the file existence should be truthy', function() {
    deepStrictEqual(
      readLines(
        {
          fileReader,
          existenceChecker,
          encoding
        },
        'path'
      ),
      {
        lines: ['line1', 'line2', 'line3']
      }
    );
  });

  it('should give the the existence as a falsy value when the file does not exist', function() {
    deepStrictEqual(
      readLines(
        {
          fileReader,
          existenceChecker,
          encoding
        },
        'other path'
      ),
      {
        readError: 'other path: No such file or directory'
      }
    );
  });
});

describe('getFields', function() {
  it('should give an array of all the  fields in each line', function() {
    deepStrictEqual(
      getFields({ lines: ['ab,cd', 'ef,gh'], fieldNo: 1, delimiter: ',' }),
      {
        fields: ['ab', 'ef'],
        fieldError: ''
      }
    );
  });

  it('should give the whole line if the line contains only one field', function() {
    deepStrictEqual(
      getFields({
        lines: ['ab,cd', 'ef,gh', 'ij'],
        fieldNo: 2,
        delimiter: ','
      }),
      {
        fields: ['cd', 'gh', 'ij'],
        fieldError: ''
      }
    );
  });

  it('should give corresponding error if the given field zero', function() {
    deepStrictEqual(
      getFields({
        lines: ['ab,cd', 'ef,gh', 'ij'],
        fieldNo: 0,
        delimiter: ','
      }),
      {
        fields: [],
        fieldError: 'cut: [-cf] list: values may not include zero'
      }
    );
  });

  it('should give corresponding error if the given field is NaN', function() {
    deepStrictEqual(
      getFields({
        lines: ['ab,cd', 'ef,gh', 'ij'],
        fieldNo: 'a',
        delimiter: ','
      }),
      {
        fields: [],
        fieldError: 'cut: [-cf] list: illegal list value'
      }
    );
  });
});

describe('cut', function() {
  const fileReader = path =>
    'abc,def,ghi,iii\njkl,mno,pqr\nstu,vwx,yz,zzz\nxyz';
  const existenceChecker = path => path === 'path';
  const encoding = 'utf8';

  it('should do the operation and return back a proper message if the file exist', function() {
    const userInputs = ['node', 'cut.js', '-d', ',', '-f', '2', 'path'];
    const expected = { message: 'def\nmno\nvwx\nxyz', error: '' };
    deepStrictEqual(
      cut(userInputs, { fileReader, existenceChecker, encoding }),
      expected
    );
  });

  it('should give an error if the given field is zero', function() {
    const options = ['node', 'cut.js', '-d', ',', '-f', '0', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: values may not include zero'
    };
    deepStrictEqual(
      cut(options, { fileReader, existenceChecker, encoding }),
      expected
    );
  });

  it('should give an error if the given field is NaN', function() {
    const options = ['node', 'cut.js', '-f', 'a', '-d', ',', 'path'];
    const expected = {
      message: '',
      error: 'cut: [-cf] list: illegal list value'
    };
    deepStrictEqual(
      cut(options, { fileReader, existenceChecker, encoding }),
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
      cut(userInputs, { fileReader, existenceChecker, encoding }),
      expected
    );
  });
});
