<!--
 * @Author: Michael19522462886 2632044037@qq.com
 * @Date: 2024-09-29 10:28:31
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-08 10:22:21
 * @FilePath: \pzadmin_me\src\views\auth\admin\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <PanelHead :route="route"/>

    <el-dialog v-model="visible" title="编辑用户" width="500" @close="closeVisible()">
        <el-form ref="instanceForm" :rules="rules" :model="form" label-width="100px" label-position="left">
            <el-form-item prop="id" v-show="false">
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请填写手机号" disabled />
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="菜单权限" prop="permissions_id">
                <el-select v-model="form.permissions_id" :placeholder="adminName(form.permissions_id)">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="$emit('visibleChange', closeVisible())">取消</el-button>
                <el-button type="primary" @click="innerVisible(instanceForm)">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <el-table :data="tableData.list" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="name" label="昵称" width="100" />
        <el-table-column prop="permissions_id" label="所属组别" width="100">
            <template #default="scope">
                {{ adminName(scope.row.permissions_id) }}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="130" />
        <el-table-column prop="active" label="状态" width="100">
            <template #default="scope">
                <el-tag :type="scope.row.active === 1 ? 'success' : 'danger'">{{
                    scope.row.active === 1 ? '正常' : '停用'
                    }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
            <template #default="scope">
                <el-icon>
                    <timer />
                </el-icon>
                {{ formatData(scope.row.create_time) }}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="scoped">
                <el-button link type="primary" @click="handleVisible(scoped.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="padding: 10px 25px">
        <el-pagination
          v-model:currentPage="paginationData.pageNum"
          :page-size="paginationData.pageSize"
          background
          layout="prev, pager, next"
          :total="tableData.total"
          class="mt-4"
          style="justify-content: right"
          @current-change="handleCurrentChange"
        />
      </div>
</template>

<script setup>

import { format } from 'date-fns'
import { authAdmin, menuSelectlist, updateAdmin} from '../../../api';
import { onMounted, reactive, ref, nextTick ,toRaw} from 'vue';
import { useRoute } from 'vue-router';
import PanelHead from '../../../components/PanelHead.vue';
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10,
})
const route = useRoute()
// console.log(JSON.stringify(route),"route")
//弹窗开关
const visible = ref(false)
//form表单
const form = reactive({
    mobile: '',
    name: '',
    permissions_id: 0,
    id: ''
})
const options = ref([])
onMounted(() => {
    getAdminList()
    getSelectAdmin()
})
//分页提交功能
const handleCurrentChange = (val) => {
    paginationData.pageNum = val
    getAdminList()
}
//创建表单实例
const instanceForm = ref()

//表单校验规则
const rules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }],
    permissions_id: [{ required: true, trigger: 'blur', message: '请输入选择权限' }]
})
// 获取管理员列表
const getAdminList = async () => {
    const data = await authAdmin(paginationData)
    tableData.list = data.list
    tableData.total = data.total
}
//获取权限列表
const getSelectAdmin = async () => {
    const data = await menuSelectlist()
    options.value = data
    console.log("data", options)

}
const tableData = reactive({
    list: [],
    total: 0
})

//提交表单
const innerVisible = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const { name, permissions_id } = form
            updateAdmin({ name, permissions_id }).then(() => {
                ElMessage.success('操作成功')
                closeVisible()
                getAdminList()
            })
        } else {
            console.log(fields)
        }
    })
}
//关闭弹窗
const closeVisible = () => {
    visible.value = false
}

//角色身份转换方法
const adminName = (id) => {
    // if (!scope && scope != 0) return '-'
    return options.value?.filter(item => item.id === id).name ? options.value.filter(item => item.id === id)[0].name : "超级管理员"
}
const formatData = (timestamp) => {
    const date = new Date(timestamp)
    return format(date, 'yyyy-MM-dd HH:mm:ss')
}
//打开弹窗
const handleVisible = (val) => {
    visible.value = true
    console.log("val", val)
    nextTick(() => {
        Object.assign(form, { id: val.id, name: val.name, mobile: val.mobile, permissions_id: val.permissions_id })
    })
}
</script>

<style lang="less" scoped></style>