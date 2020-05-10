import utils from '@/utils/index.js'
import Combination from '@/core/combination.js'
import DataController from '@/core/data-controller.js'

const before = (element, key, value) => {
  switch (key) {
    case 'data.style.position.xCoordinate':
    case 'data.style.position.yCoordinate': {
      const hasChildren = !!element.childrens
      if (hasChildren) {
        const elementList = utils.getDeepTraversal(element)
        elementList.shift()
        const offset = Number(value) - Number(utils.getValueFromObj(element, key))
        elementList.forEach(elementItem => {
          utils.setValueToObj(elementItem, key, String(Number(utils.getValueFromObj(elementItem, key)) + offset))
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
        current = utils.deepQuery(elements, current.parentId)
        Combination.refresh(current)
        hasParent = !!current.parentId
      }
      break
    }
    case 'data.content.data.mode':
      DataController.init(element)
      break
    case 'data.content.data.staticData':
      DataController.getStaticData(element)
      break
    case 'data.content.data.suffixApi':
    case 'data.content.data.completeApi':
      // todo debounce
      DataController.getApiData(element)
      break
    default:
      break
  }
}

export default {
  before,
  after
}
