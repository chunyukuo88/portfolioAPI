module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    './src/common/repository.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  setupFiles: ['dotenv/config'],
};
