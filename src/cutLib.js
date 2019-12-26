'use strict';

const parseUserOptions = function(cmdLineArgs) {
  const [, delimiter, , fieldNo, path] = cmdLineArgs;
  return { delimiter, fieldNo: +fieldNo, path };
};

const readLines = function({ readFileSync, existsSync }, path) {
  const lines = [];
  const error = '';
  if (existsSync(path))
    return { lines: readFileSync(path, 'utf8').split('\n'), error };
  return { lines, error: `${path}: No such file or directory` };
};

const cutRequiredField = function(delimiter, fieldNo, line) {
  let splittedLine = line.split(delimiter);
  if (splittedLine.length === 1) return splittedLine[0];
  return splittedLine[fieldNo - 1];
};

const getFields = function({ lines, fieldNo, delimiter }) {
  const errors = {
    fieldIsNaN: 'cut: [-cf] list: illegal list value',
    fieldIsZero: 'cut: [-cf] list: values may not include zero'
  };
  if (isNaN(fieldNo)) return { fieldError: errors.fieldIsNaN, fields: [] };
  if (fieldNo === 0) return { fieldError: errors.fieldIsZero, fields: [] };
  const fields = lines.map(cutRequiredField.bind(null, delimiter, fieldNo));
  return { fields, fieldError: '' };
};

const cut = function(cmdLineArgs, fileSystem) {
  const { path, fieldNo, delimiter } = parseUserOptions(cmdLineArgs);
  const { lines, error } = readLines(fileSystem, path);
  if (error) return { error, message: '' };
  const { fields, fieldError } = getFields({ lines, fieldNo, delimiter });
  return { message: fields.join('\n'), error: fieldError };
};

module.exports = {
  parseUserOptions,
  readLines,
  getFields,
  cut
};
