module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    es2017: true,
    node: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    chance: 'readonly'
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
