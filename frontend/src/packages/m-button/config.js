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
              span: 6,
              component: 'config-input',
              props: {
                label: '宽度',
                suffix: 'px'
              }
            },
            {
              key: 'height',
              span: 6,
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
              span: 6,
              component: 'config-input',
              props: {
                label: 'x坐标',
                suffix: 'px'
              }
            },
            {
              key: 'yCoordinate',
              span: 6,
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
                    value: 'staticData',
                    label: '静态数据'
                  },
                  {
                    value: 'apiData',
                    label: '接口数据'
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
              removes: ['content.data.mode !== \'staticData\''],
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
              removes: ['content.data.mode !== \'apiData\''],
              span: 24,
              component: 'config-select',
              props: {
                label: '接口方案',
                options: [
                  {
                    value: 'relative',
                    label: '相对路径'
                  },
                  {
                    value: 'absolute',
                    label: '绝对路径'
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
              removes: ['content.data.mode !== \'apiData\'', 'content.data.apiScheme !== \'relative\''],
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
              removes: ['content.data.mode !== \'apiData\'', 'content.data.apiScheme !== \'absolute\''],
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
              removes: ['content.data.mode !== \'apiData\''],
              span: 24,
              component: 'config-table',
              props: {
                label: '参数配置',
                cols: [
                  {
                    label: '参数名',
                    width: 130,
                    prop: {
                      key: 'key',
                      component: 'config-input'
                    }
                  },
                  {
                    label: '参数值',
                    prop: {
                      key: 'value',
                      component: 'config-input'
                    }
                  }
                ],
                default: {
                  key: '',
                  value: ''
                },
                operations: {
                  add: {
                    label: '添加参数'
                  },
                  delete: {
                    label: '删除参数'
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
                    prop: {
                      key: 'property',
                      component: 'config-text'
                    }
                  },
                  {
                    label: '字段',
                    prop: {
                      key: 'field',
                      component: 'config-input'
                    }
                  },
                  {
                    label: '状态',
                    width: 70,
                    align: 'right',
                    prop: {
                      key: 'status',
                      component: 'config-text'
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  interact: []
}
