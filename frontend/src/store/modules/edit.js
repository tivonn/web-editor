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
      // todo 命令模式
      case 'combine': {
        const { elements, activeElements } = this.getters
        if (activeElements.length <= 1) {
          return Message.warning('请选择一个以上元件')
        } else if (activeElements.some(element => !!element.parentId)) {
          return Message.warning('请选择未组合元件')
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
      case 'uncombine': {
        const { elements, activeElements } = this.getters
        if (activeElements.length !== 1) {
          return Message.warning('请选择一个元件')
        } else if (activeElements[0].type !== 'combination') {
          return Message.warning('请选择已组合元件')
        }
        const parent = activeElements[0]
        const { childrens } = parent
        Combination.uncombine(parent, elements)
        this.dispatch('setElements', elements)
        this.dispatch('setActiveElements', childrens)
        Message.success('解除组合成功')
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
