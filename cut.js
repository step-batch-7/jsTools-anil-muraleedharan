const { readFileSync } = require('fs');
const {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
} = require('./src/cutLib');

const main = function(cmdLineArgs) {
  const { path, fields, delimiter } = parseUserOptions(cmdLineArgs);
  const { contents } = readFileContents(readFileSync, 'utf8', path);
  const fieldsList = getFieldsList(fields);
  const requiredFields = getRequiredFields(contents, fieldsList, delimiter);
  process.stdout.write(generateMessage(requiredFields, delimiter));
};

main(process.argv);
