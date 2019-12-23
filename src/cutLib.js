const parseUserOptions = function(cmdLineArgs) {
  const requiredArgs = cmdLineArgs.slice(2);
  const argsLength = requiredArgs.length;
  const parsedOptions = {};
  const indexOfFields = requiredArgs.indexOf('-f') + 1;
  const indexOfDelimiter = requiredArgs.indexOf('-d') + 1;

  parsedOptions.fields = requiredArgs[indexOfFields].split(',');
  parsedOptions.delimiter = requiredArgs[indexOfDelimiter];
  if (argsLength % 2 != 0) {
    parsedOptions.path = requiredArgs[argsLength - 1];
  }
  return parsedOptions;
};

const readFileContents = function(fileReader, existenceChecker, path) {
  if (existenceChecker(path)) {
    return { fileExistence: true, contents: fileReader(path).split('\n') };
  }
  return { fileExistence: false, contents: [] };
};

module.exports = { parseUserOptions, readFileContents };
