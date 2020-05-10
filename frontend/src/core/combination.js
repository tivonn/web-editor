import Vue from 'vue'
import utils from '@/utils/index.js'
import config from '@/packages/special/combination/config.js'

const combine = (childrens) => {
  return utils.getId('element')
    .then(res => {
      const id = res
      return Promise.resolve({
        id,
        type: 'combination',
        ...getData(childrens),
        config,
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
    }
  }
}

const refresh = (element) => {
  Object.assign(element, getData(element.childrens))
}

const uncombine = (element, elements) => {
  const parent = utils.deepQuery(elements, element.parentId)
  let elementList
  if (utils.isArray(parent)) {
    elementList = parent
  } else if (utils.isPlainObject(parent)) {
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
