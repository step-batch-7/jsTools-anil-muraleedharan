const parseUserOptions = function(cmdLineArgs) {
  const parsedOptions = {};
  parsedOptions.delimiter = cmdLineArgs[3];
  parsedOptions.fields = cmdLineArgs[5];
  parsedOptions.path = cmdLineArgs[6];
  return parsedOptions;
};

const readFileContents = function(fileReader, path) {
  return { fileExistence: true, contents: fileReader(path).split('\n') };
};

const getFieldsList = function(fields) {
  let fieldsList = fields.split(',');
  return fieldsList.map(field => +field);
};

module.exports = { parseUserOptions, readFileContents, getFieldsList };
