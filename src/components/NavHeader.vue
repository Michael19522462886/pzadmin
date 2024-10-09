<template>
    <div class="nav-header">
        <div class="nav-left flex-box">
            <!-- 左侧折叠区 -->
            <el-icon class="icon" size="20" @click="store.commit('collapaseMenu')">
                <Fold />
            </el-icon>
            <ul class="flex-box">
                <li v-for="(item, index) in selectMenu" :key="item.path" class="flex-box tab"
                    :class="{ selected: route.path === item.path }">
                    <el-icon size="12" class="icon">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text" :to="{ path: item.path }">
                        {{ item.name }}
                    </router-link>
                    <el-icon @click="closeTab(item, index)" class="icon-close" size="12">
                        <Close />
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="nav-right">
            <el-dropdown>
                <div class="el-dropdown-link flex-box">
                    <el-avatar :src="localData.avatar" />
                    <p style="margin: 0 10px">{{localData.name}}</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="exitLogin">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
//当前的路由对象
const route = useRoute()
const router = useRouter()
const store = useStore()
//得到的是ref数据 script中需要进行.value得到
const selectMenu = computed(() => {
    return store.state.menu.selectMenu
})
const closeTab = (item, index) => {
    store.commit('closeTab', item)

    //非当前页面tag
    if (item.path !== route.path) {
        return
    }
    const selectMenuData = selectMenu.value
    if (index === selectMenuData.length) {
        //如果tag只有一个
        if (!selectMenuData.length) {
            router.push('/')
        } else {
            console.log('selectMenuData', index)
            router.push({
                path: selectMenuData[index - 1].path
            })
        }
    } else {
        router.push({
            path: selectMenuData[index].path
        })
    }


}
const exitLogin = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userinfo")
    localStorage.removeItem("pz_admin")
    router.push('/login')
}
const localData = JSON.parse(localStorage.getItem('userinfo'))
</script>


<style scoped lang="less">
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}

.nav-header {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    .nav-left {
        height: 100%;
        cursor: pointer;

        .icon {
            width: 25px;
            height: 100%;
        }

        .icon:hover {
            background-color: #ccc;
        }

        .tab {
            padding: 0 10px;
            height: 100%;

            .icon-close {
                width: 30px;
                height: 100%;
                visibility: hidden;
            }

            .text {
                margin: 0 5px;
                color: #000;
            }

            &.selected {
                a {
                    color: #409eff;
                }

                i {
                    color: #409eff;
                }

                background-color: #f5f5f5;
            }
        }

        .tab:hover {
            background-color: #ccc;

            .icon-close {
                visibility: inherit;
                cursor: pointer;
                color: #000;

            }
        }

    }

    .nav-right {
        display: flex;

        .nav-admin {
            display: inline-block;
            line-height: 45px;
        }

        .nav-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>