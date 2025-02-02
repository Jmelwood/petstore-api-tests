module.exports = {
  spec: process.argv[2] ?? ['test/**/*.spec.ts'],
  extension: ['.spec.ts'],
  import: 'tsx',
  slow: 10_000,
  timeout: 30_000,
  recursive: true,
  ui: 'bdd',
  parallel: true,
  require: ['./setup.ts'],
  reporter: 'mocha-multi-reporters',
  reporterOptions: {
    configFile: 'reporter.conf.cjs'
  }
};
