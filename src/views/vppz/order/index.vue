<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-13 17:35:24
 * @LastEditors: Michael19522462886 2632044037@qq.com
 * @LastEditTime: 2024-10-10 15:54:55
 * @FilePath: \accompany\pzadmin\src\views\vppz\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="group-container">
        <PanelHead :route="route" />
        <div class="group-content">
            <div class="table-search">
                <el-space wrap>
                    <el-input v-model="page.out_trade_no" style="width: 240px; height: 40px; margin-right: 10px"
                        placeholder="请输入订单号" clearable />
                    <el-button @click="handleSearch" type="primary" size="large">查询</el-button>
                </el-space>
            </div>
            <!-- table列表start -->
            <el-table :data="tableData.list" stripe style="width: 100%">
                <el-table-column prop="out_trade_no" label="订单号" width="140" fixed="left" />
                <el-table-column prop="hospital_name" label="就诊医院" />
                <el-table-column prop="service_name" label="陪诊服务" />
                <!-- <el-table-column prop="companion.avatar" label="陪护师" width="80">
                    <template #default="scope">
                        <el-image :src="scope.row.companion.avatar"
                            style="width: 50px; height: 50px; border-radius: 50%" />
                    </template>
                </el-table-column> -->
                <el-table-column prop="companion.mobile" label="陪护师手机号" />
                <el-table-column prop="price" label="总价" width="80" />
                <el-table-column prop="paidPrice" label="已付" width="80" />
                <el-table-column prop="starttime" label="下单时间" />
                <el-table-column prop="trade_state" label="订单状态">
                    <template #default="scope">
                        <div v-if="scope.row.trade_state">
                            <el-tag type="primary" v-if="scope.row.trade_state === '待服务'">{{ scope.row.trade_state
                                }}</el-tag>
                            <el-tag type="success" v-else-if="scope.row.trade_state === '已完成'">{{ scope.row.trade_state
                                }}</el-tag>
                            <el-tag type="info" v-else-if="scope.row.trade_state === '已取消'">{{ scope.row.trade_state
                                }}</el-tag>
                            <el-tag type="info" v-else-if="scope.row.trade_state === '待支付'">{{ scope.row.trade_state
                                }}</el-tag>
                        </div>
                        <div v-else>
                            <el-tag type="primary">已接单</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="service_state" label="接单状态" />
                <el-table-column prop="client.mobile" label="联系人手机号" />
                <el-table-column label="操作" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" text v-if="scope.row.trade_state === '待服务'"
                            @click="visibleDialog(scope.row.out_trade_no)">
                            <span>服务完成</span>
                        </el-button>
                        <el-button type="primary" text v-else>
                            <span style="color: #bfd5ed">暂无服务</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table列表end -->

        </div>
        <div style="padding: 10px 25px">
            <el-pagination
              v-model:currentPage="page.pageNum"
              :page-size="page.pageSize"
              background
              layout="prev, pager, next"
              :total="tableData.total"
              class="mt-4"
              style="justify-content: right"
              @current-change="handleCurrentChange"
            />
          </div>
    </div>
</template>

<script setup>
import PanelHead from '../../../components/PanelHead.vue';
import { useRoute } from 'vue-router';
import { ref, reactive ,onMounted} from 'vue';
import { getOrderList } from '../../../api';
const route = useRoute();
onMounted(() => {
    getOrder();
})
//删除弹窗显示状态控制
const visible = ref(false)
//服务完成
const ownId = ref()
//打开窗口
const visibleDialog = (id) => {
    visible.value = true
    ownId.value = id
}
//table
//table列表数据
const tableData = reactive({
    list: [],
    total: 0
})
//page
//初始化设置
const page = reactive({
    pageNum: 1,
    pageSize: 5,
    out_trade_no: ''
})
  //翻页功能
  const handleCurrentChange = (val) => {
    page.pageNum = val
    getOrder()
  }
// 搜索逻辑
const handleSearch = () => {

}
//获取订单列表
const getOrder = async () => {
    const data = await getOrderList(page)
    console.log("order_list",data.list)
    tableData.list = data.list
    tableData.total = data.total
    console.log(tableData.list)
  }
</script>

<style lang="less" scoped>
.group-container {
    margin: 10px;

    .group-content {
        background-color: #fff;

        .table-search {
            padding: 20px;
            text-align: right;
        }
    }
}
</style>