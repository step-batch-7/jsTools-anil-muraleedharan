const parseUserOptions = function(cmdLineArgs) {
  [, , , delimiter, , fields, path] = cmdLineArgs;
  return { delimiter, fields, path };
};

const readFileContents = function(fileReader, path) {
  return { fileExistence: true, contents: fileReader(path).split('\n') };
};

const getFieldsList = function(fields) {
  let fieldsList = fields.split(',');
  return fieldsList.map(field => +field);
};

module.exports = { parseUserOptions, readFileContents, getFieldsList };
