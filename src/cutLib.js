'use strict';

const parseUserOptions = function(cmdLineArgs) {
  const increment = 1;
  const begin = 0;
  const delimiterIndex = cmdLineArgs.indexOf('-d') + increment;
  const fieldNumIndex = cmdLineArgs.indexOf('-f') + increment;
  const pathIndex = Math.max(delimiterIndex, fieldNumIndex) + increment;
  const delimiter =
    delimiterIndex === begin ? '\t' : cmdLineArgs[delimiterIndex];
  const fieldNum = +cmdLineArgs[fieldNumIndex];
  const path = cmdLineArgs[pathIndex];
  return { delimiter, fieldNum, path };
};

const readLines = function({ readFileSync, existsSync }, path) {
  const lines = [];
  const error = '';
  if (existsSync(path)) {
    return { lines: readFileSync(path, 'utf8').split('\n'), error };
  }
  return { lines, error: `${path}: No such file or directory` };
};

const cutRequiredField = function(delimiter, fieldNum, line) {
  const minLength = 1;
  const begin = 0;
  const decrement = 1;
  const splittedLine = line.split(delimiter);
  if (splittedLine.length === minLength) {
    return splittedLine[begin];
  }
  if (fieldNum > splittedLine.length) {
    return '';
  }
  return splittedLine[fieldNum - decrement];
};

const cutFields = function({ lines, fieldNum, delimiter }) {
  const begin = 0;
  const errors = {
    fieldIsNaN: 'cut: [-cf] list: illegal list value',
    fieldIsZero: 'cut: [-cf] list: values may not include zero'
  };
  if (isNaN(fieldNum)) {
    return { fieldError: errors.fieldIsNaN, rows: [] };
  }
  if (fieldNum === begin) {
    return { fieldError: errors.fieldIsZero, rows: [] };
  }
  const rows = lines.map(cutRequiredField.bind(null, delimiter, fieldNum));
  return { rows, fieldError: '' };
};

module.exports = {
  parseUserOptions,
  readLines,
  cutFields
};
