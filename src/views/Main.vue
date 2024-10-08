<template>
    <div class="common-layout">
        <el-container>
            <Aside />
            <el-container class="body-layout">
                <el-header>
                    <NavHearder />

                </el-header>
                <RouterView />
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Aside from '../components/Aside.vue'
import NavHearder from '../components/NavHeader.vue'
</script>
<style lang="less" scoped>
.el-container {
    height: 100%;
}
.common-layout {
    height: 100%;
}
.body-layout {
    height: 100%;
    display: flex;
    flex-direction: column;

}
</style>