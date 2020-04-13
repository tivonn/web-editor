import * as types from '@/store/mutation-types.js'

const state = {
  elements: [],
  activeElements: []
}

const getters = {
  elements: state => state.elements,
  activeElements: state => state.activeElements
}

const actions = {
  setElements ({ commit }, value) {
    commit(types.SET_ELEMENTS, value)
  },

  setActiveElements ({ commit }, value) {
    commit(types.SET_ACTIVE_ELEMENTS, value)
  }
}

const mutations = {
  [types.SET_ELEMENTS] (state, value) {
    state.elements = value
  },

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
