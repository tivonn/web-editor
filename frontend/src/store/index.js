import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils/index.js'
const modules = utils.importFiles(require.context('@/store/modules', false, /\.js$/))

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
