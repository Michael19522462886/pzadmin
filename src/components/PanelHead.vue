<!--
 * @Author: Michael19522462886 2632044037@qq.com
 * @Date: 2024-10-05 12:25:25
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 10:25:56
 * @FilePath: \pzadmin_me\src\components\PanelHead.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="group-header">
      <h3><slot name="header">{{ props.route.meta.name }}</slot></h3>
      <p><slot name="content">{{ props.route.meta.describe}}</slot></p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    route:{
      type: Object
    }
  })
  </script>
  
  <style scoped lang="less">
    .group-header {
      font-size: 12px;
      padding: 10px;
      background-color: #c9cdd0;
      border-radius: 5px;
    }
  </style>
  