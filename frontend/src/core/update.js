import tools from '@/utils/tools.js'
import Combination from '@/core/combination.js'

const before = (element, key, value) => {
  switch (key) {
    case 'id':
      return Promise.reject(new Error('return'))
    case 'data.style.position.xCoordinate':
    case 'data.style.position.yCoordinate': {
      const hasChildren = !!element.childrens
      if (hasChildren) {
        const elementList = tools.getDeepTraversal(element)
        elementList.shift()
        const offset = Number(value) - Number(tools.getValueFromObj(element, key))
        elementList.forEach(elementItem => {
          tools.setValueToObj(elementItem, key, String(Number(tools.getValueFromObj(elementItem, key)) + offset))
        })
      }
      break
    }
    default:
      break
  }
}

const after = (element, elements, key) => {
  switch (key) {
    case 'data.style.size.width':
    case 'data.style.size.height':
    case 'data.style.position.xCoordinate':
    case 'data.style.position.yCoordinate': {
      let current = element
      let hasParent = !!current.parentId
      while (hasParent) {
        current = tools.deepQuery(elements, current.parentId)
        Combination.refresh(current)
        hasParent = !!current.parentId
      }
      break
    }
    default:
      break
  }
}

export default {
  before,
  after
}
