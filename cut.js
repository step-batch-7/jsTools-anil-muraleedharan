const { readFileSync, existsSync } = require('fs');
const { performCut } = require('./src/performCut');

const main = function(cmdLineArgs) {
  const helpers = {
    fileReader: readFileSync,
    existenceChecker: existsSync,
    encoding: 'utf8'
  };
  const { message, error } = performCut(cmdLineArgs, helper);
  message && process.stdout.write(message);
  error && process.stderr.write(error);
};

main(process.argv);
