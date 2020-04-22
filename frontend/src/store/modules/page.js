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
  setPage ({ commit }, value) {
    commit(types.SET_PAGE, value)
  },

  setElements ({ commit }, value) {
    commit(types.SET_ELEMENTS, value)
  },

  updateElement ({ commit }, value) {
    commit(types.UPDATE_ELEMENT, value)
  },

  setActiveElements ({ commit }, value) {
    commit(types.SET_ACTIVE_ELEMENTS, value)
  }
}

const mutations = {
  [types.SET_PAGE] (state, value) {
    this._vm.$axios.get(`/pages/${value}`)
      .then(res => {
        this.dispatch('setElements', res.data.elements)
      })
  },

  [types.SET_ELEMENTS] (state, value) {
    state.elements = value
  },

  [types.UPDATE_ELEMENT] (state, value) {
    const element = state.elements.find(element => element.id === value.id)
    for (const key in value) {
      if (key === 'id') continue
      tools.setValueToObj(element, key, value[key])
    }
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
