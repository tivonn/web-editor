import * as types from '@/store/mutation-types.js'

const state = {
  activeElements: []
}

const getters = {
  activeElements: state => state.activeElements
}

const actions = {
  setActiveElements ({ commit }, value) {
    commit(types.SET_ACTIVE_ELEMENTS, value)
  }
}

const mutations = {
  [types.SET_ACTIVE_ELEMENTS] (state, value) {
    state.activeElements = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
