'use strict';

module.exports = {
  extension: ['js'],
  package: './package.json',
  slow: 3000,
  timeout: 30000,
  recursive: true,
  ui: 'bdd',
  require: './test/util/setup.js'
};
