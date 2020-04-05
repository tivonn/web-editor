import Vue from 'vue'
import 'normalize.css'
import ElementUI from '@/utils/element-ui.js'
import '@/assets/css/common.scss'
import router from '@/router'
import store from '@/store'
import App from '@/App'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
