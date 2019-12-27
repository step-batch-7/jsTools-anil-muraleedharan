'use strict';

const parseUserOptions = function(cmdLineArgs) {
  const [, delimiter, , fieldNum, path] = cmdLineArgs;
  return { delimiter, fieldNum: +fieldNum, path };
};

const readLines = function({ readFileSync, existsSync }, path) {
  const lines = [];
  const error = '';
  if (existsSync(path))
    return { lines: readFileSync(path, 'utf8').split('\n'), error };
  return { lines, error: `${path}: No such file or directory` };
};

const cutRequiredField = function(delimiter, fieldNum, line) {
  let splittedLine = line.split(delimiter);
  if (splittedLine.length === 1) return splittedLine[0];
  if (fieldNum > splittedLine.length) return '';
  return splittedLine[fieldNum - 1];
};

const cutFields = function({ lines, fieldNum, delimiter }) {
  const errors = {
    fieldIsNaN: 'cut: [-cf] list: illegal list value',
    fieldIsZero: 'cut: [-cf] list: values may not include zero'
  };
  if (isNaN(fieldNum)) return { fieldError: errors.fieldIsNaN, rows: [] };
  if (fieldNum === 0) return { fieldError: errors.fieldIsZero, rows: [] };
  const rows = lines.map(cutRequiredField.bind(null, delimiter, fieldNum));
  return { rows, fieldError: '' };
};

module.exports = {
  parseUserOptions,
  readLines,
  cutFields
};
