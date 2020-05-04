import * as types from '@/store/mutation-types.js'

const state = {
  activeElements: []
}

const getters = {
  activeElements: state => state.activeElements
}

const actions = {
  setActiveElements ({ commit }, activeElements) {
    commit(types.SET_ACTIVE_ELEMENTS, activeElements)
  }
}

const mutations = {
  [types.SET_ACTIVE_ELEMENTS] (state, activeElements) {
    state.activeElements = activeElements
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
