import Vue from 'vue'
import 'normalize.css'
import ElementUI from '@/utils/element-ui.js'
import '@/assets/iconfont/iconfont.js'
import '@/assets/css/common.scss'
import router from '@/router.js'
import store from '@/store/index.js'
import '@/axios.js'
import '@/utils/default.js'
import App from '@/App.vue'
import Icon from '@/components/Icon.vue'

Vue.use(ElementUI)

Vue.component('Icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
