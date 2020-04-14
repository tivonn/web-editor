import Vue from 'vue'
import 'normalize.css'
import ElementUI from '@/utils/element-ui.js'
import '@/assets/css/common.scss'
import router from '@/router.js'
import store from '@/store/index.js'
import '@/utils/index.js'
import App from '@/App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
