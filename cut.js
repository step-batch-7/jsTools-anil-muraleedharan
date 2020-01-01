'use strict';

const { readFile } = require('fs');
const { cut } = require('./src/executeCut');

const main = function(userArgs) {
  const displayMessage = function(error, message) {
    process.stdout.write(message);
    process.stderr.write(error);
  };

  cut({ userArgs, readFile }, displayMessage);
};

const nodeEssentialLength = 2;
main(process.argv.slice(nodeEssentialLength));
