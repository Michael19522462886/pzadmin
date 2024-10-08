/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-13 15:19:20
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-09-29 11:07:01
 * @FilePath: \accompany\pzadmin\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 引入 Vite 的配置函数
import { defineConfig } from 'vite'

// 引入 Vue 插件
import vue from '@vitejs/plugin-vue'

// 引入自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

// 引入组件自动注册插件
import Components from 'unplugin-vue-components/vite'

// 引入 Element Plus 组件解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// Vite 配置导出
export default defineConfig({
  plugins: [
    // 注册 Vue 插件
    vue(),
    
    // 自动导入设置
    AutoImport({
      resolvers: [ElementPlusResolver()], // 设置 Element Plus 的解析器
    }),

    // 组件自动注册设置
    Components({
      resolvers: [ElementPlusResolver()], // 设置 Element Plus 的解析器
    }),
  ],
})
