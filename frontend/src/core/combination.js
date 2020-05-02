import Vue from 'vue'
import tools from '@/utils/tools.js'

const combine = (childrens) => {
  const id = tools.getId('element')
  return {
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
  }
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

const refresh = (parent) => {
  Vue.set(parent, 'data', getData(parent.childrens))
}

export default {
  combine,
  refresh
}
