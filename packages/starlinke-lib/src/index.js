import SlPoper from '../packages/poper/index'
import SlFieldBatchInput from '../packages/SlFieldBatchInput/index'
import { version } from '../package.json'
const components = [SlPoper, SlFieldBatchInput]

const install = function (Vue) {
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
  SlPoper,
  SlFieldBatchInput
}
