const parseUserInputs = function(cmdLineArgs) {
  const requiredArgs = cmdLineArgs.slice(2);
  const argsLength = requiredArgs.length;
  const userOptions = {};
  const indexOfFields = requiredArgs.indexOf('-f') + 1;
  const indexOfDelimiter = requiredArgs.indexOf('-d') + 1;

  userOptions.fields = requiredArgs[indexOfFields].split(',');
  userOptions.delimiter = requiredArgs[indexOfDelimiter];
  if (argsLength % 2 != 0) {
    userOptions.path = requiredArgs[argsLength - 1];
  }
  return userOptions;
};

module.exports = { parseUserInputs };
