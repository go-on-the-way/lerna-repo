import SingleSelect from '../packages/single-select/index'
import SlUploadImages from '../packages/upload-images/index'
import { version } from '../package.json'
const components = [SingleSelect, SlUploadImages]

const install = function(Vue) {
  // 判断是否安装
  if (install.installed) {
    return
  }
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install,
  SingleSelect,
  SlUploadImages
}
