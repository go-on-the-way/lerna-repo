const fs = require('fs')
const utils = {
  // 判断文件是否存在
  hasFileExisted: (path) => {
    try {
      fs.accessSync(path, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  }
}
export default utils