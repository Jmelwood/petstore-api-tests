module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    es2018: true,
    node: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error']
  }
};
