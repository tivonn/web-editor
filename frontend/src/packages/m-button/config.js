export default {
  style: [
    {
      label: '尺寸',
      key: 'size',
      list: [
        {
          key: 'size-line1',
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
          key: 'position-line1',
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
      label: '文本',
      key: 'text',
      list: [
        {
          key: 'text-line1',
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
                    value: 'suffixApi',
                    label: '接口Api'
                  },
                  {
                    value: 'completeApi',
                    label: '完整地址'
                  }
                ]
              }
            }
          ]
        },
        {
          key: 'text-line2',
          list: [
            {
              key: 'staticData',
              remove: 'data.content.text.mode !== \'staticData\'',
              span: 24,
              component: 'config-code',
              props: {
                label: '静态数据'
              }
            }
          ]
        },
        {
          key: 'text-line3',
          list: [
            {
              key: 'suffixApi',
              remove: 'data.content.text.mode !== \'suffixApi\'',
              span: 24,
              component: 'config-input',
              props: {
                label: '接口Api',
                type: 'textarea',
                placeholder: '请输入接口Api'
              }
            }
          ]
        },
        {
          key: 'text-line4',
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
