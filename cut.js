const { performCut } = require('./src/performCut');
const main = function(cmdLineArgs) {
  const { message, error } = performCut(cmdLineArgs);
  message && process.stdout.write(message);
  error && process.stderr.write(error);
};

main(process.argv);
