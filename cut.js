const { readFileSync, existsSync } = require('fs');
const { cut } = require('./src/cutLib');

const main = function(cmdLineArgs) {
  const { message, error } = cut(cmdLineArgs, {
    fileReader: readFileSync,
    existenceChecker: existsSync,
    encoding: 'utf8'
  });
  process.stdout.write(message);
  process.stderr.write(error);
};

main(process.argv);
