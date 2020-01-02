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

const parseUserOptions = function(userArgs) {
  const begin = 0;
  let fieldError = '';
  const { delimiter, delimiterIndex } = getDelimiter(userArgs);
  const { fieldNum, fieldNumIndex } = getField(userArgs);
  const path = getPath({ fieldNumIndex, delimiterIndex }, userArgs);
  if (isNaN(fieldNum)) {
    fieldError = 'cut: [-cf] list: illegal list value';
  }
  if (fieldNum === begin) {
    fieldError = 'cut: [-cf] list: values may not include zero';
  }
  return { cutOptions: { delimiter, fieldNum, path }, fieldError };
};

const loadLines = function(
  { path, delimiter, fieldNum },
  readFile,
  onComplete
) {
  readFile(path, 'utf8', (error, contents) => {
    if (error) {
      onComplete(`${path}: No such file or directory`, '');
      return;
    }
    const lines = contents.split('\n');
    const fields = cutFields({ lines, delimiter, fieldNum });
    onComplete('', fields.join('\n'));
  });
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
  return lines.map(cutRequiredField.bind(null, delimiter, fieldNum));
};

module.exports = {
  parseUserOptions,
  loadLines,
  cutFields
};
