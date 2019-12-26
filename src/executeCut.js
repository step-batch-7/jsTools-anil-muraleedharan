'use strict';

const { parseUserOptions, readLines, cutFields } = require('./cutLib');

const cut = function(cmdLineArgs, fileSystem) {
  const { path, fieldNum, delimiter } = parseUserOptions(cmdLineArgs);
  const { lines, error } = readLines(fileSystem, path);
  if (error) return { error, message: '' };
  const { rows, fieldError } = cutFields({ lines, fieldNum, delimiter });
  return { message: rows.join('\n'), error: fieldError };
};

exports.cut = cut;
