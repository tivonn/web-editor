import * as types from '@/store/mutation-types.js'
import utils from '@/utils/index.js'
import Update from '@/core/update.js'

const state = {
  userInfo: {},
  system: {
    style: {},
    envs: []
  },
  elements: []
}

const getters = {
  userInfo: state => state.userInfo,
  system: state => state.system,
  env: state => state.system.envs[0],
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
    return this._vm.$axios.get(`/systems/${systemId}`)
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
  },

  triggerElement({ commit }, elementInfo) {
    commit(types.TRIGGER_ELEMENT, elementInfo)
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
    const update = (element, updateObj, completeKey, updateKey, value) => {
      Update.before(element, completeKey, value)
      utils.setValueToObj(updateObj, updateKey, value)
      Update.after(element, completeKey, state.elements)
    }
    const { id, updateData } = elementInfo
    const element = utils.deepQuery(state.elements, id)
    for (const updateDataKey in updateData) {
      const currentValue = utils.getValueFromObj(element, updateDataKey)
      const updateValue = updateData[updateDataKey]
      let key, value
      if (utils.isArray(currentValue) && utils.isPlainObject(updateValue) && utils.hasProperty(updateValue, 'itemUpdateData')) {
        const { index, itemUpdateData } = updateValue
        const updateObj = currentValue[index]
        for (const itemKey in itemUpdateData) {
          key = `${updateDataKey}.${itemKey}`
          value = itemUpdateData[itemKey]
          update(element, updateObj, key, itemKey, value)
        }
      } else {
        key = updateDataKey
        value = updateValue
        update(element, element, key, key, value)
      }
    }
  },

  [types.TRIGGER_ELEMENT] (state, elementInfo) {
    const { id, key } = elementInfo
    const element = utils.deepQuery(state.elements, id)
    Update.trigger(element, key)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
