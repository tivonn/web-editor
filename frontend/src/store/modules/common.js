import * as types from '@/store/mutation-types.js'
import tools from '@/utils/tools.js'
import Combination from '@/core/combination.js'

const state = {
  system: {},
  elements: []
}

const getters = {
  system: state => state.system,
  elements: state => state.elements
}

const actions = {
  setSystem ({ commit }, value) {
    commit(types.SET_SYSTEM, value)
  },

  setPage ({ commit }, value) {
    commit(types.SET_PAGE, value)
  },

  setElements ({ commit }, value) {
    commit(types.SET_ELEMENTS, value)
  },

  updateElement ({ commit }, value) {
    commit(types.UPDATE_ELEMENT, value)
  }
}

const mutations = {
  [types.SET_SYSTEM] (state, value) {
    this._vm.$axios.get(`/systems/${value}`)
      .then(res => {
        state.system = res.data
      })
  },

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
    const element = tools.deepQuery(state.elements, { value: value.id })
    for (const key in value) {
      // todo 装饰器模式
      // before
      switch (key) {
        case 'id':
          continue
        case 'data.style.position.xCoordinate':
        case 'data.style.position.yCoordinate': {
          const hasChildren = !!element.childrens
          if (hasChildren) {
            const elementList = tools.getDeepTraversal(element)
            elementList.shift()
            const offset = Number(value[key]) - Number(tools.getValueFromObj(element, key))
            elementList.forEach(elementItem => {
              tools.setValueToObj(elementItem, key, String(Number(tools.getValueFromObj(elementItem, key)) + offset))
            })
          }
          break
        }
        default:
          break
      }
      tools.setValueToObj(element, key, value[key])
      // after
      switch (key) {
        case 'data.style.size.width':
        case 'data.style.size.height':
        case 'data.style.position.xCoordinate':
        case 'data.style.position.yCoordinate': {
          let current = element
          let hasParent = !!current.parentId
          while (hasParent) {
            current = tools.deepQuery(state.elements, { value: current.parentId })
            Combination.refresh(current)
            hasParent = !!current.parentId
          }
          break
        }
        default:
          break
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
