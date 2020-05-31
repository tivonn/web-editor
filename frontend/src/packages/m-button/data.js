import DataController from '@/core/data-controller.js'

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
    data: {
      mode: 'staticData',
      staticData: {
        data: '按钮'
      },
      apiScheme: 'relative',
      relativeApi: '',
      absoluteApi: '',
      params: [],
      parses: [
        {
          property: '文本',
          field: 'data',
          status: DataController.getStatus('success').label
        }
      ]
    }
  },
  interacts: []
}
