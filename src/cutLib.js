const parseUserOptions = function(cmdLineArgs) {
  [, , , delimiter, , fields, path] = cmdLineArgs;
  return { delimiter, fields, path };
};

const readFileContents = function(fileReader, encoding, path) {
  return {
    fileExistence: true,
    contents: fileReader(path, encoding).split('\n')
  };
};

const getFieldsList = function(fields) {
  return [+fields];
};

const getFieldContent = function(fieldSeparatedContents, field) {
  return fieldSeparatedContents[field - 1];
};

const separateFields = function(fields, delimiter, line) {
  const fieldSeparatedContents = line.split(delimiter);
  return fields.map(getFieldContent.bind(null, fieldSeparatedContents));
};

const getRequiredFields = function(fileContents, fields, delimiter) {
  return fileContents.map(separateFields.bind(null, fields, delimiter));
};

const generateMessage = function(requiredFields, delimiter) {
  const lines = requiredFields.map(fields => fields.join(delimiter));
  return lines.join('\n');
};

module.exports = {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
};
