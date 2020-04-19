import * as types from '@/store/mutation-types.js'

const state = {
  system: {}
}

const getters = {
  system: state => state.system
}

const actions = {
  setSystem ({ commit }, value) {
    commit(types.SET_SYSTEM, value)
  }
}

const mutations = {
  [types.SET_SYSTEM] (state, value) {
    state.system = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
