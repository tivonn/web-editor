import axios from '@/axios.js'
import router from '@/router.js'
import store from '@/store/index.js'
import utils from '@/utils/index.js'

const getUrl = (apiScheme, api) => {
  const isRelativeApi = apiScheme === 'relative'
  if (isRelativeApi) {
    const { env } = store.getters
    return `${env[env.length - 1] === '/' ? env.slice(0, -1) : env}/${api[0] === '/' ? api.slice(1, api.length) : api}`
  } else {
    return api
  }
}

const getParams = (originalParams) => {
  const params = {}
  originalParams.forEach(param => {
    if (param.key !== '') {
      const { key } = param
      const value = getParamValue(param)
      params[key] = value
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
      const { element } = param
      const id = element[element.length - 1]
      const targetElement = utils.deepQuery(store.getters.elements, id)
      return utils.getValueFromObj(targetElement, 'content.data.result.data')
    }
    default: {
      return ''
    }
  }
}

const request = (method, url, data) => {
  return axios[method](url, method === 'get' || method === 'delete' ? { params: data } : data)
}

export default {
  getUrl,
  getParams,
  request
}
