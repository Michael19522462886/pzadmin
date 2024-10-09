/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-14 11:42:10
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 15:34:43
 * @FilePath: \accompany\pzadmin\src\store\menu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const localData = localStorage.getItem('pz_admin')
// console.log(localData)
const state = localData ? (localData.menu) : {
    isCollapse: false,
    selectMenu: [],
    routerList: [],
    menuActive: '1-1'
}
const mutations = {
    collapaseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload) {
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeTab(state, item) {
        const index = state.selectMenu.findIndex(items => items.name === item.name)
        state.selectMenu.splice(index, 1)
    },
    dynamicMenu(state, payload) {
        // 通过g1ob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log(modules)
        function routerSet(router) {
            router.forEach(route => {
                // 判断没有子菜单，拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`
                    //拿到获取的vue组件
                    route.component = modules[url]
                }
                else {
                    routerSet(route.children)

                }
            })
        }
        routerSet(payload)
        // 完整的路由数据 在经过routerSet处理后 payload发生了改变 这是引用传递
        state.routerList = payload
    },
    updateMenuActive(state, payload) {
        console.log("updateMenuActive", payload)
        state.menuActive = payload
    }
}

export default {
        state,
        mutations
    }