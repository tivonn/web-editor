import axios from '@/axios.js'
import store from '@/store/index.js'
import utils from '@/utils/index.js'
import enums from '@/enums/index.js'

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
  let params = {}
  utils.getValueFromObj(element, 'content.data.params').forEach(param => {
    if (param.key !== '') {
      const { key, value } = param
      params = Object.assign({}, params, {
        [key]: value
      })
    }
  })
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

const updateStatus = (element, type) => {
  const parses = utils.getValueFromObj(element, 'content.data.parses')
  parses.forEach(parse => {
    if (!type) {
      const result = utils.getValueFromObj(element, 'content.data.result')
      type = utils.hasProperty(result, parse.field) ? 'success' : 'error'
    }
    parse.status = enums.REQUEST_STATUS[type].label
  })
}

const updateResult = (element, data) => {
  store.dispatch('updateElement', {
    id: element.id,
    'content.data.result': data
  })
  updateStatus(element)
}

export default {
  init,
  getStaticData,
  getApiData,
  updateStatus
}
