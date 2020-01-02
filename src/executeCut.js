'use strict';

const cutModule = require('./cutLib');

const cut = function({ userArgs, readFile }, onComplete, cutLib = cutModule) {
  const { cutOptions, fieldError } = cutLib.parseUserOptions(userArgs);
  if (fieldError) {
    onComplete(fieldError, '');
    return;
  }
  cutLib.loadLines(cutOptions, readFile, onComplete);
};

exports.cut = cut;
//
