import store from '@/store/index.js'
import utils from '@/utils/index.js'
import RequestController from '@/core/request-controller.js'

const init = (element) => {
  const mode = utils.getValueFromObj(element, 'content.data.mode')
  // eslint-disable-next-line
  eval(`get${utils.capitalize(mode)}`)(element)
}

const getStaticData = (element) => {
  const staticData = utils.getValueFromObj(element, 'content.data.staticData')
  updateResult(element, staticData)
}

const getApiData = (element) => {
  const apiScheme = utils.getValueFromObj(element, 'content.data.apiScheme')
  const api = utils.getValueFromObj(element, `content.data.${apiScheme}Api`)
  if (api === '') return
  const url = RequestController.getUrl(apiScheme, api)
  const originalParams = utils.getValueFromObj(element, 'content.data.params')
  const params = RequestController.getParams(originalParams)
  const data = {
    url,
    params
  }
  updateStatus(element, 'pending')
  RequestController.request('post', '/proxy', data)
    .then(res => {
      updateResult(element, res.data)
    })
    .catch(err => {
      updateResult(element, err.data)
    })
}

const getStatus = (type) => {
  switch (type) {
    case 'pending': {
      return {
        label: '匹配中',
        value: 1
      }
    }
    case 'success': {
      return {
        label: '成功',
        value: 2
      }
    }
    case 'error': {
      return {
        label: '失败',
        value: 3
      }
    }
    default: {
      return {}
    }
  }
}

const updateStatus = (element, type) => {
  const parses = utils.getValueFromObj(element, 'content.data.parses')
  parses.forEach(parse => {
    if (!type) {
      const result = utils.getValueFromObj(element, 'content.data.result')
      type = utils.hasProperty(result, parse.field) ? 'success' : 'error'
    }
    parse.status = getStatus(type).label
  })
}

const updateResult = (element, data) => {
  store.dispatch('updateElement', {
    id: element.id,
    updateData: {
      'content.data.result': data
    }
  })
  updateStatus(element)
}

export default {
  init,
  getStaticData,
  getApiData,
  getStatus,
  updateStatus
}
