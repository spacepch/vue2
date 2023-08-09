import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'

const myAxios = axios.create({
  baseURL: 'https://big-event-vue-api-t.itheima.net'
})

myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
})

myAxios.interceptors.response.use(function (response) {
  return response
},
function (error) {
  if (error.response.status === 401) {
    MessageBox.confirm('登录已超时, 清重新登录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.commit('updateToken', '')
      store.commit('updateUserInfo', '')
      router.push('/login')
      Message.info('已退出登录！')
    }).catch(err => err)
    // store.commit('updateToken', '')
    // store.commit('updateUserInfo', '')
    // router.push('/login')
    // Message.info('已退出登录！')
  }
  return Promise.reject(error)
})

export default myAxios
