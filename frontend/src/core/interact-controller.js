import axios from '@/axios.js'

const init = (element, dom) => {
  const { interacts } = element
  interacts.forEach(interact => {
    interact.isAble && dom.addEventListener(interact.event, () => {
      interact.actions.forEach(action => getAction(action))
    })
  })
}

const getAction = (action) => {
  // eslint-disable-next-line
  action.isAble && eval(`${action.type}`)(action.value)
}

// eslint-disable-next-line
const link = (value) => {
  const { page, blank } = value
  window.open(page, blank ? '_blank' : '_self')
}

// eslint-disable-next-line
const ajax = (value) => {
  const { api } = value
  axios.get(api)
}

export default {
  init
}
