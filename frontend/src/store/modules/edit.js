import * as types from '@/store/mutation-types.js'
import Multiple from '@/core/multiple.js'

const state = {
  hoverElements: [],
  activeElements: [],
  multipleElement: {}
}

const getters = {
  hoverElements: state => state.hoverElements,
  activeElements: state => state.activeElements,
  multipleElement: state => state.multipleElement
}

const actions = {
  setHoverElements ({ commit }, hoverElements) {
    commit(types.SET_HOVER_ELEMENTS, hoverElements)
  },

  setActiveElements ({ commit }, activeElements) {
    commit(types.SET_ACTIVE_ELEMENTS, activeElements)
  },

  setMultipleElement ({ commit }, elements) {
    commit(types.SET_MULTIPLE_ELEMENT, elements)
  }
}

const mutations = {
  [types.SET_HOVER_ELEMENTS] (state, hoverElements) {
    state.hoverElements = hoverElements
  },

  [types.SET_ACTIVE_ELEMENTS] (state, activeElements) {
    state.activeElements = activeElements
    this.dispatch('setMultipleElement', activeElements)
  },

  [types.SET_MULTIPLE_ELEMENT] (state, elements) {
    state.multipleElement = Multiple.batch(elements)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
