
const path = require('path')

export default {
  outputPath: path.resolve(__dirname, '../dist'),
  // 打包忽略
  external: {
    axios: 'axios',
    qs: 'qs'
  }
}