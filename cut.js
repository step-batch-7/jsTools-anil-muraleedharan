const { readFileSync, existsSync } = require('fs');
const { performCut } = require('./src/performCut');

const main = function(cmdLineArgs) {
  const helpers = {
    fileReader: readFileSync,
    existenceChecker: existsSync,
    encoding: 'utf8'
  };
  const { message, error } = performCut(cmdLineArgs, helpers);
  process.stdout.write(message);
  process.stderr.write(error);
};

main(process.argv);
