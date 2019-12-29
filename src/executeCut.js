'use strict';

const cutModule = require('./cutLib');

const cut = function(cmdLineArgs, fileSystem, cutLib = cutModule) {
  const { path, fieldNum, delimiter } = cutLib.parseUserOptions(cmdLineArgs);
  const { lines, error } = cutLib.readLines(fileSystem, path);
  if (error) {return { error, message: '' };}
  const { rows, fieldError } = cutLib.cutFields({ lines, fieldNum, delimiter });
  return { message: rows.join('\n'), error: fieldError };
};

exports.cut = cut;
