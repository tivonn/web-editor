import RequestController from '@/core/request-controller.js'

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
      value: 'request'
    }
  ]
}

const config = {
  link: [
    {
      key: 'page',
      component: 'config-input',
      props: {
        label: '目标页面'
      },
      default: ''
    },
    {
      key: 'params',
      component: 'config-table',
      props: {
        label: '参数配置',
        cols: [
          {
            label: '参数名',
            width: 100,
            list: [
              {
                key: 'key',
                component: 'config-input'
              }
            ]
          },
          {
            label: '参数值模式',
            width: 130,
            list: [
              {
                key: 'mode',
                component: 'config-select',
                props: {
                  options: [
                    {
                      label: '自定义值',
                      value: 'custom'
                    },
                    {
                      label: '路由参数',
                      value: 'urlParam'
                    },
                    {
                      label: '页面元件',
                      value: 'element'
                    }
                  ]
                }
              }
            ]
          },
          {
            label: '参数值',
            list: [
              {
                key: 'custom',
                removes: [row => row.mode !== 'custom'],
                component: 'config-input'
              },
              {
                key: 'urlParam',
                removes: [row => row.mode !== 'urlParam'],
                component: 'config-input'
              },
              {
                key: 'element',
                removes: [row => row.mode !== 'element'],
                component: 'config-cascader',
                props: {
                  options: 'elements',
                  optionLabel: 'name',
                  optionValue: 'id'
                }
              }
            ]
          }
        ],
        default: {
          key: '',
          mode: 'custom',
          custom: '',
          urlParam: '',
          element: []
        },
        operations: {
          add: {
            label: '添加参数'
          },
          delete: {
            label: '删除参数',
            width: 30
          }
        }
      }
    },
    {
      key: 'blank',
      component: 'config-whether',
      props: {
        label: '新标签页打开'
      },
      default: false
    }
  ],
  request: [
    {
      key: 'method',
      component: 'config-radio',
      props: {
        label: '接口方式',
        options: [
          {
            label: 'GET',
            value: 'get'
          },
          {
            label: 'POST',
            value: 'post'
          },
          {
            label: 'PUT',
            value: 'put'
          },
          {
            label: 'DELETE',
            value: 'delete'
          }
        ]
      },
      default: 'get'
    },
    {
      key: 'apiScheme',
      component: 'config-select',
      props: {
        label: '接口方案',
        options: [
          {
            label: '相对路径',
            value: 'relative'
          },
          {
            label: '绝对路径',
            value: 'absolute'
          }
        ]
      },
      default: 'relative'
    },
    {
      key: 'relativeApi',
      removes: [action => action.value.apiScheme !== 'relative'],
      component: 'config-input',
      props: {
        label: '相对路径',
        type: 'textarea',
        placeholder: '请输入相对路径'
      }
    },
    {
      key: 'absoluteApi',
      removes: [action => action.value.apiScheme !== 'absolute'],
      component: 'config-input',
      props: {
        label: '绝对路径',
        type: 'textarea',
        placeholder: '请输入绝对路径'
      }
    },
    {
      key: 'params',
      component: 'config-table',
      props: {
        label: '参数配置',
        cols: [
          {
            label: '参数名',
            width: 100,
            list: [
              {
                key: 'key',
                component: 'config-input'
              }
            ]
          },
          {
            label: '参数值模式',
            width: 130,
            list: [
              {
                key: 'mode',
                component: 'config-select',
                props: {
                  options: [
                    {
                      label: '自定义值',
                      value: 'custom'
                    },
                    {
                      label: '路由参数',
                      value: 'urlParam'
                    },
                    {
                      label: '页面元件',
                      value: 'element'
                    }
                  ]
                }
              }
            ]
          },
          {
            label: '参数值',
            list: [
              {
                key: 'custom',
                removes: [row => row.mode !== 'custom'],
                component: 'config-input'
              },
              {
                key: 'urlParam',
                removes: [row => row.mode !== 'urlParam'],
                component: 'config-input'
              },
              {
                key: 'element',
                removes: [row => row.mode !== 'element'],
                component: 'config-cascader',
                props: {
                  options: 'elements',
                  optionLabel: 'name',
                  optionValue: 'id'
                }
              }
            ]
          }
        ],
        default: {
          key: '',
          mode: 'custom',
          custom: '',
          urlParam: '',
          element: []
        },
        operations: {
          add: {
            label: '添加参数'
          },
          delete: {
            label: '删除参数',
            width: 30
          }
        }
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
  const { page, params: originalParams, blank } = value
  const params = RequestController.getParams(originalParams)
  const paramKeys = Object.keys(params)
  let url
  if (paramKeys.length) {
    url = `${page}?${paramKeys.map(key => `${key}=${params[key]}`).join('&')}`
  } else {
    url = page
  }
  window.open(url, blank ? '_blank' : '_self')
}

// eslint-disable-next-line
const request = (value) => {
  const { apiScheme } = value
  const api = value[`${apiScheme}Api`]
  if (api === '') return
  const url = RequestController.getUrl(apiScheme, api)
  const { method, params: originalParams } = value
  const params = RequestController.getParams(originalParams)
  RequestController.request(method, url, params)
}

export default {
  options,
  config,
  init
}
