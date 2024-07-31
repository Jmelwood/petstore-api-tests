module.exports = {
  extension: ['.spec.ts'],
  loader: 'ts-node/esm',
  package: './package.json',
  slow: 10000,
  timeout: 30000,
  recursive: true,
  ui: 'bdd',
  require: ['./setup.ts'],
  reporter: 'mocha-ctrf-json-reporter',
  reporterOptions: {
    outputDir: 'reports'
  }
};
