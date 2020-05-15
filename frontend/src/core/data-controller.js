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
  updateSource(element, staticData)
}

const getApiData = (element) => {
  const mode = utils.getValueFromObj(element, 'content.data.apiScheme')
  const api = utils.getValueFromObj(element, `content.data.${mode}Api`)
  if (api === '') return
  let absoluteUrl
  const isRelativeApi = mode === 'relative'
  if (isRelativeApi) {
    const { env } = store.getters
    absoluteUrl = `${env}${env[env.length - 1] === '/' || api[0] === '/' ? '' : '/'}${api}`
  } else {
    absoluteUrl = api
  }
  const data = {
    url: absoluteUrl
  }
  updateStatus(element, 'pending')
  axios.post('/proxy', data)
    .then(res => {
      updateSource(element, res.data)
    })
    .catch(err => {
      updateSource(element, err.data)
    })
}

const updateStatus = (element, type) => {
  const parses = utils.getValueFromObj(element, 'content.data.parses')
  parses.forEach(parse => {
    if (!type) {
      const source = utils.getValueFromObj(element, 'content.data.source')
      type = utils.hasProperty(source, parse.field) ? 'success' : 'error'
    }
    parse.status = enums.REQUEST_STATUS[type].label
  })
}

const updateSource = (element, data) => {
  store.dispatch('updateElement', {
    id: element.id,
    'content.data.source': data
  })
  updateStatus(element)
}

export default {
  init,
  getStaticData,
  getApiData,
  updateStatus
}
