import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/utils/tools.js'
const modules = tools.importFiles(require.context('@/store/modules', false, /\.js$/))

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
