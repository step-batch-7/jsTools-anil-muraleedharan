'use strict';

const { readFileSync, existsSync } = require('fs');
const { cut } = require('./src/executeCut');

const main = function(cmdLineArgs) {
  const { message, error } = cut(cmdLineArgs, { readFileSync, existsSync });
  process.stdout.write(message);
  process.stderr.write(error);
  // const displayMessage = function ({ error, message }) {
  //   process.stdout.write(message);
  //   process.stderr.write(error);
  // };
  // cut({ cmdLineArgs, readFile, displayMessage });
};

main(process.argv.slice());
