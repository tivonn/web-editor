import * as types from '@/store/mutation-types'

const state = {
  elements: []
}

const getters = {
  elements: state => state.elements
}

const actions = {
  addElement ({ commit }, value) {
    commit(types.ADD_ELEMENT, value)
  }
}

const mutations = {
  [types.ADD_ELEMENT] (state, value) {
    state.elements.push(value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
