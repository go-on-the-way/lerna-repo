let { clearConsole } = require('./config/index')
let plugins = []

clearConsole && plugins.push('transform-remove-console')

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: plugins
}
