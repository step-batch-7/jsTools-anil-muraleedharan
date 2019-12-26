'use strict';

const parseUserOptions = function(cmdLineArgs) {
  const [, delimiter, , fieldNo, path] = cmdLineArgs;
  return { delimiter, fieldNo: +fieldNo, path };
};

const readLines = function({ readFileSync, existsSync }, path) {
  const lines = [];
  const readError = '';
  if (existsSync(path))
    return { lines: readFileSync(path, 'utf8').split('\n'), readError };
  return { lines, readError: `${path}: No such file or directory` };
};

const getFields = function({ lines, fieldNo, delimiter }) {
  const errors = {
    fieldIsNaN: 'cut: [-cf] list: illegal list value',
    fieldIsZero: 'cut: [-cf] list: values may not include zero'
  };
  if (isNaN(fieldNo)) return { fieldError: errors.fieldIsNaN, fields: [] };
  if (fieldNo === 0) return { fieldError: errors.fieldIsZero, fields: [] };
  const fields = lines.map(line => {
    let splittedLine = line.split(delimiter);
    if (splittedLine.length === 1) return splittedLine[0];
    return splittedLine[fieldNo - 1];
  });
  return { fields, fieldError: '' };
};

const cut = function(cmdLineArgs, fileSystem) {
  const { path, fieldNo, delimiter } = parseUserOptions(cmdLineArgs);
  const { lines, readError } = readLines(fileSystem, path);
  if (readError) return { error: readError, message: '' };
  const { fields, fieldError } = getFields({ lines, fieldNo, delimiter });
  if (fieldError) return { error: fieldError, message: '' };
  return { message: fields.join('\n'), error: '' };
};

module.exports = {
  parseUserOptions,
  readLines,
  getFields,
  cut
};
