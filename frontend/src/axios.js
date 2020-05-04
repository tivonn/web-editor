import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.response.use(res => {
  return Promise.resolve(res)
}, err => {
  Message.error('系统错误')
  return Promise.reject(err)
})

Vue.prototype.$axios = axios

export default axios
