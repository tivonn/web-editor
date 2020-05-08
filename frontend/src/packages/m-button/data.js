import enums from '@/enums/index.js'

export default {
  style: {
    size: {
      width: '100',
      height: '50'
    },
    position: {
      xCoordinate: '0',
      yCoordinate: '0'
    }
  },
  content: {
    text: {
      mode: 'staticData',
      data: {
        data: '按钮'
      },
      parses: [
        {
          property: '文本',
          field: 'data',
          status: enums.REQUEST_STATUS.success.label
        }
      ]
    }
  },
  interact: {

  }
}
