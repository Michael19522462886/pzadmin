/*
 * @Author: Michael19522462886 2632044037@qq.com
 * @Date: 2024-09-19 10:53:40
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-09-21 20:35:00
 * @FilePath: \pzadmin_me\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import store from '../store'
import { ElMessage } from 'element-plus'
const http = axios.create({
    baseURL: 'https:/v3pz.itndedu.com/v3pz',
    timeout: 10000
  })
  http.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      const token = localStorage.getItem('token')
      //不需要添加token的api
      const whiteUrl = ['/get/code', '/user/authentication', '/login']
      if (token && !whiteUrl.includes(config.url)) {
        config.headers['x-token'] = token
      }
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
// 添加响应拦截器
http.interceptors.response.use(
    function (response) {
      //接口异常数据需要给用户提示
      const data = response.data
      if (data.code === -1) {
        ElMessage.error(response.data.message)
      }
      if (data.code === -2) {
        // store.remove('token')
        // store.remove('userInfo')
        // store.remove('menuAside')
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem("pz_admin")
        
        window.location.href = window.location.origin + '/'
      }
      if (data.token) {
        return data
      }
      return data.data
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
export default http