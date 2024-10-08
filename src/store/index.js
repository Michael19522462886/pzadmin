/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-14 11:42:02
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 09:59:59
 * @FilePath: \accompany\pzadmin\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'
import menu from './menu'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  plugins: [new createPersistedState({
    key: 'pz_admin',
  })],
  modules: {
    menu
  }
})
export default store