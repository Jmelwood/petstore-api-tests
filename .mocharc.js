const debug = process.env.DEBUG;

module.exports = {
  extension: ['.spec.js'],
  package: './package.json',
  slow: 3000,
  timeout: debug ? 9999999 : 30000,
  recursive: true,
  ui: 'bdd',
  require: ['@babel/register', './test/util/setup.js']
};
