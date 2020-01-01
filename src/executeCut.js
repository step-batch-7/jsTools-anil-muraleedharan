'use strict';

const { parseUserOptions, loadLines } = require('./cutLib');

const cut = function({ userArgs, readFile }, onComplete) {
  const { cutOptions, fieldError } = parseUserOptions(userArgs);
  if (fieldError) {
    return onComplete(fieldError, '');
  }
  loadLines(cutOptions, readFile, onComplete);
};

exports.cut = cut;
