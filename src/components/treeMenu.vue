<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-13 17:29:08
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 11:31:18
 * @FilePath: \accompany\pzadmin\src\components\treeMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <template v-for="(item, index) in props.menuData">
      <el-menu-item
        @click="handleChick(item, `${props.index}-${item.meta.id}`)"
        v-if="!item.children || item.children.length == 0"
        :index="`${props.index}-${item.meta.id}`"
        
      >
        <el-icon size="20"><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
  
      <el-sub-menu
        v-else
        :index="`${props.index}-${item.meta.id}`"
        @click="$emit('handleClicks', item, `${props.index}-${item.meta.id}`)"
      >
        <template #title>
          <el-icon size="20"><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <TreeMenu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
      </el-sub-menu>
    </template>
  </template>

<script setup>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const props = defineProps(['menuData', 'index'])
console.log(props.menuData,"@@@")
const router = useRouter()
const store = useStore()
const handleChick = (item,active) => {
    console.log(item,"item")
    console.log("active",active)
    store.commit('addMenu',item.meta)
    store.commit('updateMenuActive',active)

    // console.log(active,"active")
    // console.log(item,"@@@")
    router.push(item.meta.path)
}
// console.log("@@",props.menuData)
</script>

<style lang="less" scoped>
</style>