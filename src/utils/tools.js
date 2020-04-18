const getTime = () => {
  // todo 结合服务端返回时间差
  return new Date()
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

const getObj = (key, value) => {
  let obj = {}
  const list = key.split('.')
  while (list.length) {
    const key = list.pop()
    obj = {
      [key]: value
    }
    value = obj
  }
  return obj
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

export default {
  getTime,
  guid,
  getObj,
  deepClone
}
