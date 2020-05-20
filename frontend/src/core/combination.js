import store from '@/store/index.js'
import utils from '@/utils/index.js'
import Operation from '@/core/operation.js'
import { Message } from 'element-ui'

const config = {
  style: [
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
  content: [],
  interact: []
}

const combine = (childrens) => {
  if (childrens.length <= 1) {
    return Message.warning('请选择一个以上元件')
  } else if (childrens.some(element => !!element.parentId)) {
    return Message.warning('请选择未组合元件')
  }
  return utils.getId('element')
    .then(res => {
      const id = res
      const { elements } = store.getters
      return Promise.resolve({
        id,
        type: 'combination',
        ...getData(childrens),
        childrens: childrens.map(children => Object.assign({}, children, { parentId: id })),
        name: `组合-${Operation.getElementCount(elements, false) + 1}`
      })
    })
}

const getData = (childrens) => {
  return {
    style: {
      size: {
        width: String(
          Math.max(...childrens.map(children =>
            Number(utils.getValueFromObj(children, 'style.position.xCoordinate')) + Number(utils.getValueFromObj(children, 'style.size.width'))
          )) -
          Math.min(...childrens.map(children => utils.getValueFromObj(children, 'style.position.xCoordinate')))
        ),
        height: String(
          Math.max(...childrens.map(children =>
            Number(utils.getValueFromObj(children, 'style.position.yCoordinate')) + Number(utils.getValueFromObj(children, 'style.size.height'))
          )) -
          Math.min(...childrens.map(children => utils.getValueFromObj(children, 'style.position.yCoordinate')))
        )
      },
      position: {
        xCoordinate: String(
          Math.min(...childrens.map(children => utils.getValueFromObj(children, 'style.position.xCoordinate')))
        ),
        yCoordinate: String(
          Math.min(...childrens.map(children => utils.getValueFromObj(children, 'style.position.yCoordinate')))
        )
      }
    },
    content: {},
    interact: {}
  }
}

const uncombine = (element) => {
  if (element.type !== 'combination') {
    return Message.warning('请选择已组合元件')
  }
  const { elements } = store.getters
  const parent = utils.deepQuery(elements, element.parentId)
  let elementList
  if (utils.isArray(parent)) {
    elementList = parent
  } else if (utils.isPlainObject(parent)) {
    elementList = parent.childrens
  }
  const index = elementList.findIndex(elementItem => elementItem.id === element.id)
  const { childrens } = element
  elementList.splice(
    index,
    1,
    ...(childrens.map(children => {
      if (parent.id) {
        utils.setValueToObj(children, 'parentId', parent.id)
      } else {
        utils.deleteKeyFromObj(children, 'parentId')
      }
      return children
    }))
  )
  return childrens
}

const refresh = (element) => {
  Object.assign(element, getData(element.childrens))
}

export default {
  config,
  combine,
  refresh,
  uncombine
}
