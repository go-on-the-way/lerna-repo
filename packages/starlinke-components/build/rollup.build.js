const fs = require('fs')
const components =  require('../components')
const { formatTypeList, addons, esDir } = require('../config/rollup.build.config.js')
const { styleOutputPath } = require('../config/index')
const { build } = require('./rollup.createConfig')
const { resolve, getAssetsPath } = require('./utils')
fs.mkdirSync(resolve())
fs.mkdirSync(getAssetsPath(styleOutputPath))
if ([...formatTypeList, ...addons].some((item) => item.format === esDir)) {
  fs.mkdirSync(getAssetsPath(esDir))
}
let pkg = []
formatTypeList.forEach(({ format, min, suffix } = {}) => {
  Object.keys(components).forEach((moduleName) => {
    const { input, output } = components[moduleName]
    pkg.push({ min, format, suffix, moduleName, input, output: `${output}` })
  })
})
pkg = pkg.concat(addons)

build(pkg)
