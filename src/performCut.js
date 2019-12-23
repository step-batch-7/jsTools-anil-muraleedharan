const { readFileSync } = require('fs');
const {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
} = require('./cutLib');

const performCut = function(cmdLineArgs) {
  const { path, fields, delimiter } = parseUserOptions(cmdLineArgs);
  const { contents } = readFileContents(readFileSync, 'utf8', path);
  const fieldsList = getFieldsList(fields);
  const requiredFields = getRequiredFields(contents, fieldsList, delimiter);
  return generateMessage(requiredFields, delimiter);
};

exports.performCut = performCut;
