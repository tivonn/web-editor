export default {
  style: [
    {
      label: '尺寸',
      key: 'size',
      list: [
        {
          key: 'size-row1',
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
        },
        {
          key: 'size-row2',
          gutter: 20,
          list: [
            {
              key: 'fontSize',
              span: 6,
              component: 'config-input',
              props: {
                label: '字体大小',
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
          key: 'position-row1',
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
          key: 'text-row1',
          list: [
            {
              key: 'data',
              span: 24,
              component: 'config-input',
              props: {
                label: '数据'
              }
            }
          ]
        }
      ]
    }
  ],
  interact: []
}
