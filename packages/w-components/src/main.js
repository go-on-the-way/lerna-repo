import SdcCanvas from 'comp/SdcCanvas'
import SdcCanvasBlock from 'comp/SdcCanvasBlock'

const components = [SdcCanvas, SdcCanvasBlock]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  SdcCanvas,
  SdcCanvasBlock
}
