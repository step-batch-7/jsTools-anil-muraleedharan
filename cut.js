const { performCut } = require('./src/performCut');
const main = function(cmdLineArgs) {
  process.stdout.write(performCut(cmdLineArgs));
};

main(process.argv);
