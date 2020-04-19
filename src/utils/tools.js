import Vue from 'vue'

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

const clamp = (value, min, max) => {
  return Math.min(Math.max(min, value), max)
}

const deepClone = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj // primitives
  if (hash.has(obj)) return hash.get(obj) // cyclic reference
  const result = obj instanceof Set
    ? new Set(obj)
    : obj instanceof Map
      ? new Map(Array.from(obj, ([key, val]) => [key, deepClone(val, hash)]))
      : obj instanceof Date
        ? new Date(obj)
        : obj instanceof RegExp
          ? new RegExp(obj.source, obj.flags)
          // ... add here any specific treatment for other classes ...
          // and finally a catch-all:
          : obj.constructor
            ? new obj.constructor()
            : Object.create(null)
  hash.set(obj, result)
  return Object.assign(
    result,
    ...Object.keys(obj).map(key => ({ [key]: deepClone(obj[key], hash) }))
  )
}

const drag = (e, container, moveCallback) => {
  let pageX = e.screenX
  let pageY = e.screenY
  container.classList.add('dragging')
  const moveContainer = (e) => {
    const offsetX = e.screenX - pageX
    const offsetY = e.screenY - pageY
    pageX = e.screenX
    pageY = e.screenY
    isFunction(moveCallback) && moveCallback(offsetX, offsetY)
  }
  const upContainer = () => {
    container.classList.remove('dragging')
    container.removeEventListener('mousemove', moveContainer)
    container.removeEventListener('mouseup', upContainer)
  }
  container.addEventListener('mousemove', moveContainer)
  container.addEventListener('mouseup', upContainer)
}

const isEnvironment = (environment) => {
  return process.env.NODE_ENV === environment
}

const isFunction = (value) => {
  return typeof value === 'function'
}

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const getTime = () => {
  // todo 结合服务端返回时间差
  return new Date()
}

const getValueFromObj = (obj, key) => {
  let value = obj
  const keyList = key.split('.')
  while (keyList.length) {
    const keyItem = keyList.shift()
    value = value[keyItem]
  }
  return value
}

const guid = (hasDatePrefix = true) => {
  // 改为向服务端获取自增id
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  return `${hasDatePrefix ? getTime().Format('yyyyMMdd') : ''}-${guid}`
}

const setValueToObj = (obj, key, value) => {
  const keyList = key.split('.')
  if (!keyList.length) return
  while (keyList.length) {
    const keyItem = keyList.shift()
    if (!keyList.length) {
      // 到数组尾，设置值
      Vue.set(obj, keyItem, value)
    } else {
      const childObj = obj[keyItem]
      if (childObj) {
        assert(isPlainObject(childObj), '数据格式有误')
        // 继续遍历
        obj = childObj
      } else {
        // 缺失字段时，构造一个新的对象插入
        let newObj = {}
        while (keyList.length) {
          const keyItem = keyList.pop()
          newObj = {
            [keyItem]: value
          }
          value = newObj
        }
        Vue.set(obj, keyItem, newObj)
      }
    }
  }
}

export default {
  assert,
  clamp,
  deepClone,
  drag,
  isEnvironment,
  isFunction,
  isPlainObject,
  getTime,
  getValueFromObj,
  guid,
  setValueToObj
}
