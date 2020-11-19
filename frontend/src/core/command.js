import { Message } from 'element-ui'
import axios from '@/axios.js'
import router from '@/router.js'
import store from '@/store/index.js'
import Combination from '@/core/combination.js'

const combine = () => {
  const { elements, activeElements } = store.getters
  Combination.combine(activeElements)
    .then(res => {
      const combination = res
      store.dispatch('setElements',
        elements
          .filter(element =>
            activeElements
              .every(activeElement => activeElement.id !== element.id)
          )
          .concat([combination]))
      store.dispatch('setActiveElements', [combination])
      Message.success('组合成功')
    })
}

const uncombine = () => {
  const { elements, activeElements } = store.getters
  if (activeElements.length !== 1) {
    return Message.warning('请选择一个元件')
  }
  const parent = activeElements[0]
  const childrens = Combination.uncombine(parent)
  store.dispatch('setElements', elements)
  store.dispatch('setActiveElements', childrens)
  Message.success('解除组合成功')
}

const save = (systemId, pageId, elements) => {
  const handle = (list) => {
    return list.map(item => {
      if (item.childrens) {
        item.childrens = handle(item.childrens)
        return item
      } else {
        return Object.assign({}, item, {
          // 删除获取的数据
          content: {
            data: Object.assign({}, item.content.data, {
              result: {}
            })
          },
          // 过滤交互
          interacts: item.interacts.reduce((interacts, interact) => {
            if (interact.event) {
              interacts.push(Object.assign({}, interact, {
                actions: interact.actions.filter(action => action.type)
              }))
            }
            return interacts
          }, [])
        })
      }
    })
  }
  elements = handle(elements)
  const data = {
    systemId,
    elements
  }
  axios.put(`/pages/${pageId}`, data)
    .then(() => Message.success('保存成功'))
}

const preview = (systemId, pageId, elements) => {
  save(systemId, pageId, elements)
  window.open(
    router.resolve({
      name: 'Preview',
      params: { sid: systemId, pid: pageId }
    }).href,
    '_blank'
  )
}

const download = (systemId) => {
  axios.put(`/build/${systemId}`)
    .then(() => Message.success('源码下载成功'))
}

export default {
  combine,
  uncombine,
  save,
  preview,
  download
}
