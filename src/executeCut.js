'use strict';

const cutModule = require('./cutLib');

const cut = function(cmdLineArgs, fileSystem, cutLib = cutModule) {
  const {
    cutOptions: { path, fieldNum, delimiter },
    fieldError
  } = cutLib.parseUserOptions(cmdLineArgs);
  if (fieldError) {
    return { error: fieldError, message: '' };
  }
  const { lines, error } = cutLib.readLines(fileSystem, path);
  if (error) {
    return { error, message: '' };
  }
  const rows = cutLib.cutFields({ lines, fieldNum, delimiter });
  return { message: rows.join('\n'), error: '' };
};

exports.cut = cut;
