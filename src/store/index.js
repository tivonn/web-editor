import Vue from 'vue'
import Vuex from 'vuex'
import edit from '@/store/modules/edit.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit
  }
})
