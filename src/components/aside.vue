<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-13 16:07:09
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 11:16:48
 * @FilePath: \accompany\pzadmin\src\components\aside.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-menu
    :style="{ width: isCollapse ? '64px' : '230px'}"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo aside-container "
    :default-active="active"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    >
    <p class="logo-lg">{{isCollapse ? 'DIDI' : 'DIDI陪诊'}}</p>
    <TreeMenu  :index="1" :menuData="menuData"/>
  </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue'
import {useRouter} from 'vue-router'
import {reactive,computed} from 'vue'
import {useStore} from 'vuex'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const router = useRouter()
const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)
let active = computed(() => store.state.menu.menuActive)
// console.log(router,"!!!")
console.log("router.options.routes[0].children",router.options.routes[0].children)
// const menuData = reactive(router.options.routes[0].children)
const routerList = computed(() => store.state.menu.routerList)
const menuData = routerList
// console.log(menuData,",menuData")
const handleOpen = () => {
//   console.log(key, keyPath)
}
const handleClose = () => {
//   console.log(key, keyPath)
}

</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;
    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>