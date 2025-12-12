module.exports = {
  spec: (() => {
    const specs = process.argv.filter(arg => arg.includes('spec'));
    return specs.length > 0 ? specs : ['test/**/*.spec.ts'];
  })(),
  extension: ['.spec.ts'],
  import: 'tsx',
  slow: 10_000,
  timeout: 30_000,
  recursive: true,
  ui: 'bdd',
  parallel: true,
  require: ['./setup.ts'],
  reporter: '@jelwood/mocha-multi-reporters',
  reporterOptions: {
    configFile: 'reporter.conf.cjs'
  }
};
