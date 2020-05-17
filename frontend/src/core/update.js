import utils from '@/utils/index.js'
import Combination from '@/core/combination.js'
import DataController from '@/core/data-controller.js'

const before = (element, key, value) => {
  switch (key) {
    case 'style.position.xCoordinate':
    case 'style.position.yCoordinate': {
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
    default: {
      break
    }
  }
}

const after = (element, key, elements) => {
  switch (key) {
    case 'style.size.width':
    case 'style.size.height':
    case 'style.position.xCoordinate':
    case 'style.position.yCoordinate': {
      let current = element
      let hasParent = !!current.parentId
      while (hasParent) {
        current = utils.deepQuery(elements, current.parentId)
        Combination.refresh(current)
        hasParent = !!current.parentId
      }
      break
    }
    case 'content.data.mode': {
      DataController.init(element)
      break
    }
    case 'content.data.staticData': {
      DataController.getStaticData(element)
      break
    }
    case 'content.data.apiScheme':
    case 'content.data.params.mode':
    case 'content.data.params.element': {
      DataController.getApiData(element)
      break
    }
    case 'content.data.parses.field': {
      DataController.updateStatus(element)
      break
    }
    default: {
      break
    }
  }
}

const trigger = (element, key) => {
  switch (key) {
    case 'content.data.relativeApi':
    case 'content.data.absoluteApi':
    case 'content.data.params.key':
    case 'content.data.params.custom':
    case 'content.data.params.urlParam':
    case 'content.data.params.delete': {
      DataController.getApiData(element)
      break
    }
    default: {
      break
    }
  }
}

export default {
  before,
  after,
  trigger
}
