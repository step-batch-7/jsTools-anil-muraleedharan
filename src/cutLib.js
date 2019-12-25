const getDelimiter = function(userArgs) {
  return userArgs[userArgs.indexOf('-d') + 1];
};

const getFieldNo = function(userArgs) {
  return userArgs[userArgs.indexOf('-f') + 1];
};

const getPath = function(userArgs) {
  return userArgs[userArgs.length - 1];
};

const parseUserOptions = function(cmdLineArgs) {
  const delimiter = getDelimiter(cmdLineArgs);
  const fields = getFieldNo(cmdLineArgs);
  const path = getPath(cmdLineArgs);
  return { delimiter, fields, path };
};

const readFileContents = function({
  fileReader,
  existenceChecker,
  encoding,
  path
}) {
  if (existenceChecker(path)) {
    return {
      contents: fileReader(path, encoding).split('\n')
    };
  }
  return {
    error: `${path}: No such file or directory`
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
  if (fieldSeparatedContents.length === 1) return fieldSeparatedContents;
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
