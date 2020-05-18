import utils from '@/utils/index.js'

const getCount = (elements, isComponent, packageType) => {
  return elements.reduce((count, element) => {
    count += utils.getDeepTraversal(element).filter(item => {
      return isComponent ? item.packageType === packageType : item.type === 'combination'
    }).length
    return count
  }, 0)
}

export default {
  getCount
}
