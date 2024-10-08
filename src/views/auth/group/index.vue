<!--
 * @Author: Michael19522462886 2632044037@qq.com
 * @Date: 2024-09-18 17:32:55
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-07 12:08:50
 * @FilePath: \pzadmin_me\src\views\auth\group\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PanelHead :route="route"/>
  <div class="btns">
    <el-button :icon="Plus" type="primary" @click="handleClick(null)" style="width: 60px;">新增</el-button>
  </div>
  <el-dialog v-model="visible" title="添加权限" width="500" :before-close="beforeClose">
    <el-form ref="instanceForm" :rules="rules" :model="form" label-width="100px" label-position="left">
      <el-form-item prop="id" v-show="false">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请填写权限名称" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-tree ref="treeRef" :data="permissionsData" show-checkbox node-key="id" style="max-width: 600px"
          :default-checked-keys="defaultKeys" :default-expanded-keys="[2]" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('visibleChange', closeVisible(instanceForm))">取消</el-button>
        <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
      </div>
    </template>


  </el-dialog>
  <el-table :data="tableData.list" stripe style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="name" label="昵称" width="180" />
    <el-table-column prop="permissionName" label="菜单权限" />
    <el-table-column label="操作" width="180">
      <template #default="scoped">
        <el-button link type="primary" @click="handleClick(scoped.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:currentPage="paginationData.pageNum" :page-size="paginationData.pageSize" background
    layout="prev, pager, next" :total="tableData.total" class="mt-4" style="justify-content: right"
    @current-change="handleCurrentChange" />
</template>

<script setup>
import { onMounted, reactive, ref, nextTick } from 'vue';
import { userGetmenu, userSetmenu, menuList } from '../../../api';
import PanelHead from '../../../components/PanelHead.vue';
import { Plus } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
const route = useRoute()
// import {Plus} from '@element-plus/icons-vue'
// 创建树形dom的ref 
const treeRef = ref()
// 创建表单的dom的ref
const instanceForm = ref()
// 选中权限
const defaultKeys = [4, 5]
// 树形结构数据
let permissionsData = ref([])
// 表单数据
const form = reactive({
  id: '',
  name: '',
  permissions: ''
})
// 表格数据
const tableData = reactive({
  list: [],
  total: 0
})
// 查询权限列表数据的参数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
})
// 表单校验规则
const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
})
onMounted(() => {
  // 页面刚加载的时候获得菜单名称加载到树形结构中
  userGetmenu().then((data) => {
    console.log("permissionsData", data)
    permissionsData = data
  })
  // 加载table
  getListData()
})
// 修改页码
const handleCurrentChange = () => {

}
// 请求权限列表数据
const getListData = () => {
  menuList(paginationData).then((data) => {
    // console.log('读取权限列表数据', data)
    const { list, total } = data
    tableData.list = list
    tableData.total = total
    console.log(tableData.list)
  })
}


// 编辑表单数据
const handleClick = (data = {}) => {
  visible.value = true

  console.log("准备替换的数据", data)
  // 弹窗打开是一个异步操作 如果去掉会导致首次打开弹窗历史填的数据加载不出来 也会导致关闭弹框功能无法清除表单域
  nextTick(() => {
    if (data) {
      console.log('编辑数据开始')
      Object.assign(form, { id: data.id, name: data.name })
      treeRef.value.setCheckedKeys(data.permission)
    }
  })
}
// 取消弹窗
const closeVisible = (formEl) => {
  if (!formEl) return
  visible.value = false
  formEl.resetFields()
  treeRef.value.setCheckedKeys(defaultKeys)
}
// 是否隐藏弹框 false代表隐藏 true代表显示
const visible = ref(false)
// // 打开弹框
// const openDialog = () => {
//   visible.value = true;
// };
// 关闭弹框
const beforeClose = () => {
  visible.value = false;
  // form.name = ''
  // form.name = ''
  // form.permissions = ''
  console.log(instanceForm.value)
  instanceForm.value.resetFields()
  treeRef.value.setCheckedKeys(defaultKeys)

  console.log('弹框已关闭');
};
// 提交表单
const innerVisible = async (formEl) => {
  if (!formEl) console.log('没有拿到节点')
  await formEl.validate((valid, fileds) => {
    if (valid) {
      console.log("(treeRef.value.getCheckedKeys()", treeRef.value.getCheckedKeys())
      let permissionForm = JSON.stringify(treeRef.value.getCheckedKeys())
      console.log(permissionForm)
      userSetmenu({ name: form.name, permissions: permissionForm, id: form.id }).then((data) => {
        console.log("权限修改", data)
        closeVisible(formEl)
        getListData()

      })

    } else {
      console.log('表单提交有误', fileds)
    }
  })
}
</script>

<style lang="less" scoped>
.btns {
  width: 80px;
}
</style>