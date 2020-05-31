import store from '@/store/index.js'

export default {
  style: [
    {
      label: '尺寸',
      key: 'size',
      list: [
        {
          gutter: 20,
          list: [
            {
              key: 'width',
              span: 10,
              component: 'config-input',
              props: {
                label: '宽度',
                suffix: 'px'
              }
            },
            {
              key: 'height',
              span: 10,
              offset: 2,
              component: 'config-input',
              props: {
                label: '高度',
                suffix: 'px'
              }
            }
          ]
        }
      ]
    },
    {
      label: '位置',
      key: 'position',
      list: [
        {
          gutter: 20,
          list: [
            {
              key: 'xCoordinate',
              span: 10,
              component: 'config-input',
              props: {
                label: 'x坐标',
                suffix: 'px'
              }
            },
            {
              key: 'yCoordinate',
              span: 10,
              offset: 2,
              component: 'config-input',
              props: {
                label: 'y坐标',
                suffix: 'px'
              }
            }
          ]
        }
      ]
    }
  ],
  content: [
    {
      label: '数据',
      key: 'data',
      list: [
        {
          list: [
            {
              key: 'mode',
              span: 24,
              component: 'config-select',
              props: {
                label: '模式',
                options: [
                  {
                    label: '静态数据',
                    value: 'staticData'
                  },
                  {
                    label: '接口数据',
                    value: 'apiData'
                  }
                ]
              }
            }
          ]
        },
        {
          list: [
            {
              key: 'staticData',
              removes: [element => element.content.data.mode !== 'staticData'],
              span: 24,
              component: 'config-code',
              props: {
                label: '静态数据'
              }
            }
          ]
        },
        {
          list: [
            {
              key: 'apiScheme',
              removes: [element => element.content.data.mode !== 'apiData'],
              span: 24,
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
              }
            }
          ]
        },
        {
          list: [
            {
              key: 'relativeApi',
              removes: [element => element.content.data.mode !== 'apiData', element => element.content.data.apiScheme !== 'relative'],
              span: 24,
              component: 'config-input',
              props: {
                label: '相对路径',
                type: 'textarea',
                placeholder: '请输入相对路径'
              }
            }
          ]
        },
        {
          list: [
            {
              key: 'absoluteApi',
              removes: [element => element.content.data.mode !== 'apiData', element => element.content.data.apiScheme !== 'absolute'],
              span: 24,
              component: 'config-input',
              props: {
                label: '绝对路径',
                type: 'textarea',
                placeholder: '请输入绝对路径'
              }
            }
          ]
        },
        {
          list: [
            {
              key: 'params',
              removes: [element => element.content.data.mode !== 'apiData'],
              span: 24,
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
                        component: 'config-select',
                        props: {
                          options: store.getters.elements,
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
                  element: ''
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
        },
        {
          list: [
            {
              key: 'parses',
              span: 24,
              component: 'config-table',
              props: {
                label: '数据解析',
                cols: [
                  {
                    label: '属性',
                    width: 130,
                    list: [
                      {
                        key: 'property',
                        component: 'config-text'
                      }
                    ]
                  },
                  {
                    label: '字段',
                    list: [
                      {
                        key: 'field',
                        component: 'config-input',
                        props: {
                          canToggle: true
                        }
                      }
                    ]
                  },
                  {
                    label: '状态',
                    width: 70,
                    align: 'right',
                    list: [
                      {
                        key: 'status',
                        component: 'config-text'
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  interact: {
    eventOptions: [
      {
        label: '单击',
        value: 'click',
        actionOptions: [
          {
            label: '跳转页面',
            value: 'link'
          },
          {
            label: '提交数据/请求',
            value: 'ajax'
          }
        ]
      },
      {
        label: '双击',
        value: 'dblclick',
        actionOptions: [
          {
            label: '跳转页面',
            value: 'link'
          }
        ]
      }
    ],
    actionOptions: {
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
  }
}
