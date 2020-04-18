import * as types from '@/store/mutation-types.js'
import tools from '@/utils/tools.js'

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
  },

  updateActiveElement ({ commit }, value) {
    commit(types.UPDATE_ACTIVE_ELEMENT, value)
  }
}

const mutations = {
  [types.SET_ELEMENTS] (state, value) {
    state.elements = value
  },

  [types.SET_ACTIVE_ELEMENTS] (state, value) {
    state.activeElements = value
  },

  [types.UPDATE_ACTIVE_ELEMENT] (state, value) {
    const activeElement = state.activeElements.find(activeElement => activeElement.id === value.id)
    for (const key in value) {
      if (key === 'id') break
      Object.assign(activeElement, tools.getObj(key, value[key]))
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
