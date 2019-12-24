const { readFileSync, existsSync } = require('fs');
const {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
} = require('./cutLib');

const performCut = function(cmdLineArgs) {
  const { path, fields, delimiter } = parseUserOptions(cmdLineArgs);
  const { fileExistence, contents } = readFileContents({
    fileReader: readFileSync,
    existenceChecker: existsSync,
    encoding: 'utf8',
    path: path
  });
  if (fileExistence) {
    const fieldsList = getFieldsList(fields);
    const requiredFields = getRequiredFields(contents, fieldsList, delimiter);
    return { message: generateMessage(requiredFields, delimiter) };
  }
  return { error: 'No such file or directory' };
};

exports.performCut = performCut;
