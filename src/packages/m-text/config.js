export default {
  style: [{
    label: '尺寸',
    key: 'size',
    list: [{
      key: 'size-line1',
      gutter: 20,
      list: [{
        label: '宽度',
        key: 'width',
        span: 6,
        component: 'config-input',
        suffix: 'px'
      }, {
        label: '高度',
        key: 'height',
        span: 6,
        component: 'config-input',
        suffix: 'px'
      }]
    }, {
      key: 'size-line2',
      gutter: 20,
      list: [{
        label: '字体大小',
        key: 'fontSize',
        span: 6,
        component: 'config-input'
      }]
    }]
  }, {
    label: '位置',
    key: 'position',
    list: [{
      key: 'position-line1',
      gutter: 20,
      list: [{
        label: 'x坐标',
        key: 'xCoordinate',
        span: 6,
        component: 'config-input',
        suffix: 'px'
      }, {
        label: 'y坐标',
        key: 'yCoordinate',
        span: 6,
        component: 'config-input',
        suffix: 'px'
      }]
    }]
  }],
  content: [{
    label: '文字',
    key: 'text',
    list: [{
      key: 'text-line1',
      list: [{
        label: '数据',
        key: 'data',
        span: 24,
        component: 'config-input'
      }]
    }]
  }],
  interact: []
}
