'use strict';

const cutModule = require('./cutLib');

const cut = function(cmdLineArgs, fileSystem, cutLib = cutModule) {
  const { parseUserOptions, readLines, cutFields } = cutLib;
  const { path, fieldNum, delimiter } = parseUserOptions(cmdLineArgs);
  const { lines, error } = readLines(fileSystem, path);
  if (error) return { error, message: '' };
  const { rows, fieldError } = cutFields({ lines, fieldNum, delimiter });
  return { message: rows.join('\n'), error: fieldError };
};

exports.cut = cut;
