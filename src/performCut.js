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
  const { contents, error } = readFileContents({
    fileReader: readFileSync,
    existenceChecker: existsSync,
    encoding: 'utf8',
    path: path
  });
  if (error) return { error };
  const fieldsList = getFieldsList(fields);
  const requiredFields = getRequiredFields(contents, fieldsList, delimiter);
  return { message: generateMessage(requiredFields, delimiter) };
};

exports.performCut = performCut;
