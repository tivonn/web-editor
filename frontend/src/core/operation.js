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
    count += utils.getDeepTraversal(element).filter(item => {
      return isComponent ? item.packageType === packageType : item.type === 'combination'
    }).length
    return count
  }, 0)
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
  const { activeElements } = store.getters
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
  store.dispatch('setActiveElements',
    activeElements.filter(activeElement =>
      deleteElements.every(deleteElement => deleteElement.id !== activeElement)
    )
  )
}

export default {
  createElement,
  getElementCount,
  getActiveElements,
  deleteElements
}
