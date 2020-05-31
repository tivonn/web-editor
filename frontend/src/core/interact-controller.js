import axios from '@/axios.js'

const options = {
  event: [
    {
      label: '单击',
      value: 'click'
    },
    {
      label: '双击',
      value: 'dblclick'
    }
  ],
  action: [
    {
      label: '跳转页面',
      value: 'link'
    },
    {
      label: '提交数据/请求',
      value: 'ajax'
    }
  ]
}

const config = {
  link: [
    {
      key: 'page',
      component: 'config-input',
      default: '',
      props: {
        label: '目标页面'
      }
    },
    {
      key: 'blank',
      component: 'config-whether',
      default: false,
      props: {
        label: '新标签页打开'
      }
    }
  ],
  ajax: [
    {
      key: 'api',
      component: 'config-input',
      default: '',
      props: {
        label: '接口'
      }
    }
  ]
}

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
  options,
  config,
  init
}
