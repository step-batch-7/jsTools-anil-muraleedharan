const {
  parseUserOptions,
  readFileContents,
  getFieldsList,
  getRequiredFields,
  generateMessage
} = require('./cutLib');

const performCut = function(
  cmdLineArgs,
  { fileReader, existenceChecker, encoding }
) {
  const { path, fields, delimiter } = parseUserOptions(cmdLineArgs);
  const { contents, error } = readFileContents({
    fileReader,
    existenceChecker,
    encoding,
    path
  });
  if (error) return { error };
  const fieldsList = getFieldsList(fields);
  const requiredFields = getRequiredFields(contents, fieldsList, delimiter);
  return { message: generateMessage(requiredFields, delimiter) };
};

exports.performCut = performCut;
