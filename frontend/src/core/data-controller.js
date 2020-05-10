import axios from '@/axios.js'
import store from '@/store/index.js'
import utils from '@/utils/index.js'

const init = (element) => {
  const mode = utils.getValueFromObj(element, 'data.content.data.mode')
  switch (mode) {
    case 'staticData':
      getStaticData(element)
      break
    case 'suffixApi':
    case 'completeApi':
      getApiData(element)
      break
    default:
      break
  }
}

const getStaticData = (element) => {
  const staticData = utils.getValueFromObj(element, 'data.content.data.staticData')
  updateSource(element, staticData)
}

const getApiData = (element) => {
  const mode = utils.getValueFromObj(element, 'data.content.data.mode')
  const api = utils.getValueFromObj(element, `data.content.data.${mode}`)
  if (api === '') return
  let completeUrl
  const isSuffixApi = mode === 'suffixApi'
  if (isSuffixApi) {
    const { env } = store.getters
    completeUrl = `${env}${env[env.length - 1] === '/' || api[0] === '/' ? '' : '/'}${api}`
  } else {
    completeUrl = api
  }
  const data = {
    url: completeUrl
  }
  axios.post('/proxy', data)
    .then(res => {
      updateSource(element, res.data)
    })
}

const updateSource = (element, data) => {
  store.dispatch('updateElement', {
    id: element.id,
    'data.content.data.source': data
  })
}

export default {
  init,
  getStaticData,
  getApiData
}
