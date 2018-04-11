require('dotenv').load();

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js'],
  rootDir: process.cwd(),
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
};
