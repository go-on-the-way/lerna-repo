import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import StarlinkeLib from '@/index'

Vue.use(ElementUI, { size: 'small' })
Vue.use(StarlinkeLib)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
