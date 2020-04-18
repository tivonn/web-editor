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
        component: 'config-input',
        span: 6
      }, {
        label: '高度',
        key: 'height',
        component: 'config-input',
        span: 6
      }]
    }, {
      key: 'size-line2',
      gutter: 20,
      list: [{
        label: '字体大小',
        key: 'fontSize',
        component: 'config-input',
        span: 6
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
        component: 'config-input',
        span: 6
      }, {
        label: 'y坐标',
        key: 'yCoordinate',
        component: 'config-input',
        span: 6
      }]
    }]
  }]
}
