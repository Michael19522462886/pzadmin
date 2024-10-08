/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-13 15:19:20
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 10:14:38
 * @FilePath: \accompany\pzadmin\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
// 去除默认样式
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import PanelHead from './components/PanelHead.vue'
// 创建一个 Vue 应用实例，用于初始化和挂载 Vue 组件
const app = createApp(App)
const localData = localStorage.getItem('pz_admin')
if(localData){
store.commit('dynamicMenu', JSON.parse(localData).menu.routerList)
store.state.menu.routerList.forEach(item => {
  router.addRoute("main",item)
})

}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  //没有token但是想去非登录界面
  if(!token && to.path !== '/login'){
    // 加上 return，会在调用 next('/login') 后停止执行后面的代码
    return next('/login')
  }
  //有token但是想去登录界面
  else if(token && to.path === '/login'){
    return next('/')
  }
  next()
})




import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ro } from 'date-fns/locale'
/**
 * Object.entries() 方法返回一个数组，其中的元素是给定对象自身的[key, value]键值对。
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('PanelHead', PanelHead)
// 将 Vue Router 插件安装到应用中
app.use(router)
app.use(store)
app.mount('#app')
