import * as types from '@/store/mutation-types.js'
import tools from '@/utils/tools.js'
import Combination from '@/core/combination.js'

const state = {
  userInfo: {},
  system: {},
  elements: []
}

const getters = {
  userInfo: state => state.userInfo,
  system: state => state.system,
  elements: state => state.elements
}

const actions = {
  setUserInfo ({ commit }) {
    this._vm.$axios.get('/userinfo')
      .then(res => {
        const timeDifference = new Date() - new Date(res.data.time)
        commit(types.SET_USER_INFO, Object.assign({}, res.data, {
          timeDifference
        }))
      })
  },

  setSystem ({ commit }, systemId) {
    this._vm.$axios.get(`/systems/${systemId}`)
      .then(res => {
        commit(types.SET_SYSTEM, res.data)
      })
  },

  setPage ({ commit }, pageId) {
    this._vm.$axios.get(`/pages/${pageId}`)
      .then(res => {
        commit(types.SET_PAGE, res.data)
      })
  },

  setElements ({ commit }, elements) {
    commit(types.SET_ELEMENTS, elements)
  },

  updateElement ({ commit }, elementInfo) {
    commit(types.UPDATE_ELEMENT, elementInfo)
  }
}

const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },

  [types.SET_SYSTEM] (state, system) {
    state.system = system
  },

  [types.SET_PAGE] (state, page) {
    this.dispatch('setElements', page.elements)
  },

  [types.SET_ELEMENTS] (state, elements) {
    state.elements = elements
  },

  [types.UPDATE_ELEMENT] (state, elementInfo) {
    const element = tools.deepQuery(state.elements, elementInfo.id)
    const beforeUpdate = (key) => {
      switch (key) {
        case 'id':
          return
        case 'data.style.position.xCoordinate':
        case 'data.style.position.yCoordinate': {
          const hasChildren = !!element.childrens
          if (hasChildren) {
            const elementList = tools.getDeepTraversal(element)
            elementList.shift()
            const offset = Number(elementInfo[key]) - Number(tools.getValueFromObj(element, key))
            elementList.forEach(elementItem => {
              tools.setValueToObj(elementItem, key, String(Number(tools.getValueFromObj(elementItem, key)) + offset))
            })
          }
          break
        }
        default:
          break
      }
    }
    const afterUpdate = (key) => {
      switch (key) {
        case 'data.style.size.width':
        case 'data.style.size.height':
        case 'data.style.position.xCoordinate':
        case 'data.style.position.yCoordinate': {
          let current = element
          let hasParent = !!current.parentId
          while (hasParent) {
            current = tools.deepQuery(state.elements, current.parentId)
            Combination.refresh(current)
            hasParent = !!current.parentId
          }
          break
        }
        default:
          break
      }
    }
    for (const key in elementInfo) {
      beforeUpdate(key)
      tools.setValueToObj(element, key, elementInfo[key])
      afterUpdate(key)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
