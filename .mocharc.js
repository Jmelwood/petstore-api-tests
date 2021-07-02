module.exports = {
  extension: ['.spec.js'],
  file: ['./test/util/setup.js'],
  package: './package.json',
  slow: 10000,
  timeout: 30000,
  recursive: true,
  ui: 'bdd',
  require: ['@babel/register']
};
