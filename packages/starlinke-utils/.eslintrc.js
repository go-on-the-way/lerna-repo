
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ENV: true
  },
  extends: "eslint:recommended",
  rules: {},
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  }
}
