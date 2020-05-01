import * as types from '@/store/mutation-types.js'
import tools from '@/utils/tools.js'

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
        if (activeElements.length <= 1) return
        const combination = {
          id: tools.getId('element'),
          type: 'combination',
          data: {
            style: {
              size: {
                width: String(
                  Math.max(...activeElements.map(activeElement =>
                    Number(tools.getValueFromObj(activeElement, 'data.style.position.xCoordinate')) + Number(tools.getValueFromObj(activeElement, 'data.style.size.width'))
                  )) -
                  Math.min(...activeElements.map(activeElement => tools.getValueFromObj(activeElement, 'data.style.position.xCoordinate')))
                ),
                height: String(
                  Math.max(...activeElements.map(activeElement =>
                    Number(tools.getValueFromObj(activeElement, 'data.style.position.yCoordinate')) + Number(tools.getValueFromObj(activeElement, 'data.style.size.height'))
                  )) -
                  Math.min(...activeElements.map(activeElement => tools.getValueFromObj(activeElement, 'data.style.position.yCoordinate')))
                )
              },
              position: {
                xCoordinate: String(
                  Math.min(...activeElements.map(activeElement => tools.getValueFromObj(activeElement, 'data.style.position.xCoordinate')))
                ),
                yCoordinate: String(
                  Math.min(...activeElements.map(activeElement => tools.getValueFromObj(activeElement, 'data.style.position.yCoordinate')))
                )
              }
            }
          },
          children: activeElements
        }
        this.dispatch('setElements',
          elements
            .filter(element =>
              activeElements
                .every(activeElement => activeElement.id !== element.id)
            )
            .concat([combination]))
        this.dispatch('setActiveElements', [combination])
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
