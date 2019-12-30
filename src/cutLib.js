'use strict';

const getDelimiter = function(userArgs) {
  const increment = 1;
  const begin = 0;
  const delimiterIndex = userArgs.indexOf('-d') + increment;
  const delimiter = delimiterIndex === begin ? '\t' : userArgs[delimiterIndex];
  return { delimiter, delimiterIndex };
};

const getField = function(userArgs) {
  const increment = 1;
  const fieldNumIndex = userArgs.indexOf('-f') + increment;
  return { fieldNum: +userArgs[fieldNumIndex], fieldNumIndex };
};

const getPath = function({ fieldNumIndex, delimiterIndex }, userArgs) {
  const increment = 1;
  const pathIndex = Math.max(delimiterIndex, fieldNumIndex) + increment;
  return userArgs[pathIndex];
};

const parseUserOptions = function(cmdLineArgs) {
  const begin = 0;
  let fieldError = '';
  const { delimiter, delimiterIndex } = getDelimiter(cmdLineArgs);
  const { fieldNum, fieldNumIndex } = getField(cmdLineArgs);
  const path = getPath({ fieldNumIndex, delimiterIndex }, cmdLineArgs);
  if (isNaN(fieldNum)) {
    fieldError = 'cut: [-cf] list: illegal list value';
  }
  if (fieldNum === begin) {
    fieldError = 'cut: [-cf] list: values may not include zero';
  }
  return { cutOptions: { delimiter, fieldNum, path }, fieldError };
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
  const rows = lines.map(cutRequiredField.bind(null, delimiter, fieldNum));
  return rows;
};

module.exports = {
  parseUserOptions,
  readLines,
  cutFields
};
