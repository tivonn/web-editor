import Vue from 'vue'
import Vuex from 'vuex'
import edit from '@/store/modules/edit'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit
  }
})
