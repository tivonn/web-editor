import axios from '@/axios.js'
import router from '@/router.js'
import store from '@/store/index.js'
import utils from '@/utils/index.js'

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
  const mode = utils.getValueFromObj(element, 'content.data.apiScheme')
  const api = utils.getValueFromObj(element, `content.data.${mode}Api`)
  if (api === '') return
  let url
  const isRelativeApi = mode === 'relative'
  if (isRelativeApi) {
    const { env } = store.getters
    url = `${env[env.length - 1] === '/' ? env.slice(0, -1) : env}/${api[0] === '/' ? api.slice(1, api.length) : api}`
  } else {
    url = api
  }
  const params = getParams(element)
  const data = {
    url,
    params
  }
  updateStatus(element, 'pending')
  axios.post('/proxy', data)
    .then(res => {
      updateResult(element, res.data)
    })
    .catch(err => {
      updateResult(element, err.data)
    })
}

const getParams = (element) => {
  let params = {}
  utils.getValueFromObj(element, 'content.data.params').forEach(param => {
    if (param.key !== '') {
      const { key } = param
      const value = getParamValue(param)
      params = Object.assign({}, params, {
        [key]: value
      })
    }
  })
  return params
}

const getParamValue = (param) => {
  const { mode } = param
  switch (mode) {
    case 'custom': {
      return param.custom
    }
    case 'urlParam': {
      const { urlParam } = param
      const route = router.app._route
      return route.query[urlParam] || route.params[urlParam] || ''
    }
    case 'element': {
      // todo get element value
      return ''
    }
    default: {
      return ''
    }
  }
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
