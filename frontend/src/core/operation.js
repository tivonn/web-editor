import { Message } from 'element-ui'
import store from '@/store/index.js'
import utils from '@/utils/index.js'
import Combination from '@/core/combination.js'

const createElement = (name, packageType) => {
  Promise.all([
    utils.getId('element'),
    require(`@/packages/${packageType}/data.js`)
  ])
    .then(res => {
      const [idRes, dataRes] = res
      const id = idRes
      const { default: data } = dataRes
      const { elements } = store.getters
      const count = getElementCount(elements, true, packageType)
      const element = Object.assign({
        id,
        type: 'component',
        ...utils.deepClone(data)
      }, {
        name: `${name}-${count + 1}`,
        packageType
      })
      store.dispatch('setElements', elements.concat([element]))
    })
    .catch(() => Message.error('获取元件数据失败'))
}

const getElementCount = (elements, isComponent, packageType) => {
  return elements.reduce((count, element) => {
    count += utils.getBFS(element).filter(item => {
      return isComponent ? item.packageType === packageType : item.type === 'combination'
    }).length
    return count
  }, 0)
}

const getBFSElements = (element) => {
  if (utils.isArray(element)) {
    return element.reduce((elements, node) => {
      elements.push(...utils.getBFS(node).filter(item => item.type === 'component'))
      return elements
    }, [])
  } else if (utils.isPlainObject(element)) {
    return utils.getBFS(element).filter(item => item.type === 'component')
  }
}

const getActiveElements = (element, isMultiple) => {
  const { activeElements } = store.getters
  if (isMultiple) {
    const isSelected = activeElements.some(activeElement => activeElement.id === element.id)
    if (isSelected) {
      return activeElements.filter(activeElement => activeElement.id !== element.id)
    } else {
      return activeElements.concat([element])
    }
  } else {
    return [element]
  }
}

const deleteElements = (deleteElements) => {
  let { elements } = store.getters
  deleteElements.forEach(deleteElement => {
    const hasParent = !!deleteElement.parentId
    if (hasParent) {
      if (deleteElements.every(item => item.id !== deleteElement.parentId)) {
        const parent = utils.deepQuery(elements, deleteElement.parentId)
        parent.childrens = parent.childrens.filter(children => children.id !== deleteElement.id)
        if (parent.childrens.length <= 1 && deleteElements.every(deleteElement => deleteElement.id !== parent.id)) {
          Combination.uncombine(parent)
        }
      }
    } else {
      elements = elements.filter(element => element.id !== deleteElement.id)
    }
  })
  store.dispatch('setElements', elements)
  // 删除元素时需要刷新hover、active中对应的元素
  ;['hover', 'active'].forEach(item => {
    store.dispatch(`set${utils.capitalize(item)}Elements`, store.getters[`${item}Elements`].reduce((newElements, oldElement) => {
      const newElement = utils.deepQuery(elements, oldElement.id)
      if (Object.keys(newElement).length) {
        newElements.push(newElement)
      }
      return newElements
    }, []))
  })
}

export default {
  createElement,
  getElementCount,
  getBFSElements,
  getActiveElements,
  deleteElements
}
