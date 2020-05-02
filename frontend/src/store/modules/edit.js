import * as types from '@/store/mutation-types.js'
import { Message } from 'element-ui'
import Combination from '@/core/combination.js'

const state = {
  activeElements: []
}

const getters = {
  activeElements: state => state.activeElements
}

const actions = {
  setActiveElements ({ commit }, value) {
    commit(types.SET_ACTIVE_ELEMENTS, value)
  },

  commandCanvas ({ commit }, value) {
    commit(types.COMMAND_CANVAS, value)
  }
}

const mutations = {
  [types.SET_ACTIVE_ELEMENTS] (state, value) {
    state.activeElements = value
  },

  [types.COMMAND_CANVAS] (state, value) {
    switch (value) {
      case 'combine': {
        const { elements, activeElements } = this.getters
        if (activeElements.length <= 1) {
          return Message.warning('需选择一个以上组件进行组合')
        } else if (activeElements.some(element => !!element.parentId)) {
          return Message.warning('含有已组合元件')
        }
        const combination = Combination.combine(activeElements)
        this.dispatch('setElements',
          elements
            .filter(element =>
              activeElements
                .every(activeElement => activeElement.id !== element.id)
            )
            .concat([combination]))
        this.dispatch('setActiveElements', [combination])
        Message.success('组合成功')
        break
      }
      default:
        break
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
