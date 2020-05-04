import Vue from 'vue'
import tools from '@/utils/tools.js'

const combine = (childrens) => {
  return tools.getId('element')
    .then(res => {
      const id = res
      return Promise.resolve({
        id,
        type: 'combination',
        data: getData(childrens),
        config: {
          style: [{
            label: '位置',
            key: 'position',
            list: [{
              key: 'position-line1',
              gutter: 20,
              list: [{
                key: 'xCoordinate',
                span: 6,
                component: 'config-input',
                props: {
                  label: 'x坐标',
                  suffix: 'px'
                }
              }, {
                key: 'yCoordinate',
                span: 6,
                component: 'config-input',
                props: {
                  label: 'y坐标',
                  suffix: 'px'
                }
              }]
            }]
          }],
          content: [],
          interact: []
        },
        childrens: childrens.map(children => Object.assign({}, children, { parentId: id }))
      })
    })
}

const getData = (childrens) => {
  return {
    style: {
      size: {
        width: String(
          Math.max(...childrens.map(children =>
            Number(tools.getValueFromObj(children, 'data.style.position.xCoordinate')) + Number(tools.getValueFromObj(children, 'data.style.size.width'))
          )) -
          Math.min(...childrens.map(children => tools.getValueFromObj(children, 'data.style.position.xCoordinate')))
        ),
        height: String(
          Math.max(...childrens.map(children =>
            Number(tools.getValueFromObj(children, 'data.style.position.yCoordinate')) + Number(tools.getValueFromObj(children, 'data.style.size.height'))
          )) -
          Math.min(...childrens.map(children => tools.getValueFromObj(children, 'data.style.position.yCoordinate')))
        )
      },
      position: {
        xCoordinate: String(
          Math.min(...childrens.map(children => tools.getValueFromObj(children, 'data.style.position.xCoordinate')))
        ),
        yCoordinate: String(
          Math.min(...childrens.map(children => tools.getValueFromObj(children, 'data.style.position.yCoordinate')))
        )
      }
    }
  }
}

const refresh = (element) => {
  Vue.set(element, 'data', getData(element.childrens))
}

const uncombine = (element, elements) => {
  const parent = tools.deepQuery(elements, element.parentId)
  let elementList
  if (tools.isArray(parent)) {
    elementList = parent
  } else if (tools.isPlainObject(parent)) {
    elementList = parent.childrens
  }
  const index = elementList.findIndex(elementItem => elementItem.id === element.id)
  elementList.splice(index, 1, ...(element.childrens.map(children => {
    if (parent.id) {
      Vue.set(children, 'parentId', parent.id)
    } else {
      Vue.delete(children, 'parentId')
    }
    return children
  })))
}

export default {
  combine,
  refresh,
  uncombine
}
