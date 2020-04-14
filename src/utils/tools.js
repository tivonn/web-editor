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

export default {
  getTime,
  guid
}
