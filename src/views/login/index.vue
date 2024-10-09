<!-- Flex 布局是 CSS 的一种布局模式，用于在容器中灵活地排列和对齐子元素。
 使用 Flexbox，可以轻松实现响应式设计，自动调整元素的大小和位置。 -->
<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width:480px">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
            </div>
            <el-form :model="loginForm" style="max-width: 600px;" class="demo-ruleForm" :rules="rules"
                ref="ruleFormRef">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码"
                        prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock">
                        <template #append>
                            <span class="code-point" @click="countdownchange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>

                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">{{
                        formType ? '注册' : '登录'
                        }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>

</template>

<script setup>
import { ref, reactive , computed,toRaw} from 'vue'
import { getCode, userAuthentication, login ,getPermissions } from '../../api'
import { ElMessage } from 'element-plus';
import {useRouter} from 'vue-router'
// import store from '../../store';
import { useStore } from 'vuex';
const router = useRouter()
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href
// formType为0表示登录界面为1表示注册界面
let formType = ref(0)
const handleChange = () => {
    formType.value = formType.value ? 0 : 1
}
let loginForm = reactive({
    userName: '17677172453',
    passWord: '123123',
    validCode: ''
})
const countdown = reactive({
    validText: '获取验证码',
    time: 10
})
const store = useStore()
// 避免用户重复点击获取验证码
let flag = false
const countdownchange = () => {

    if (flag) return
    const phoneReg = /^1(3[0-9]|4[0145879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|[0-35-9])\d{8}$/
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage.warning('请输入正确手机号')
    }
    const t = setInterval(() => {
        if (countdown.time == 0) {
            countdown.time = 10
            countdown.validText = '获取验证码'
            flag = false
            //防止重复计时
            clearInterval(t)
        }
        else {
            countdown.time--
            countdown.validText = `剩余${countdown.time}`
        }

    }, 1000);
    flag = true
    getCode({ tel: loginForm.userName }).then(({ data }) => {
        console.log(data)
        // if (data.code === 10000) {
        //     ElMessage.success('发送成功')
        // }
    })


}
//表单验证规则


//账号验证规则
const validName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const nameReg = /^1(3[0-9]|4[0145879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|[0-35-9])\d{8}$/
        return nameReg.test(value) ? callback() : callback(new Error('请输入正确手机号'))
    }
}

//密码验证规则
const validPwd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else {
        const nameReg = /^[a-zA-Z0-9_-]{4,16}$/
        return nameReg.test(value) ? callback() : callback(new Error('请输入正确密码'))
    }
}
const validCode = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('验证码不能为空'))
    } else {
        const nameReg = /^[0-9]{4}$/
        return nameReg.test(value) ? callback() : callback(new Error('请输入正确验证码'))
    }
}

//验证规则
const rules = reactive({
    userName: [{ validator: validName, trigger: 'blur' }],
    passWord: [{ validator: validPwd, trigger: 'blur' }],
    validCode: [{ validator: validCode, trigger: 'blur' }]
})
//ref拿到dom
const ruleFormRef = ref()

const routerList = computed(() => {
    return store.state.menu.routerList
})

const submitForm = async (formEl) => {
    //判断dom是否存在
    if (!formEl) console.log('没有拿到节点')
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 注册界面
            if (formType.value) {
                userAuthentication(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功，请返回登录')
                        formType = 0
                    }

                })
            } else {
                //登录界面
                login(loginForm).then((data) => {
                    if(data){
                        ElMessage.success('登录成功')
                        //页面跳转逻辑
                        console.log('data',data)
                        // 将token和用户信息缓存到浏览器
                        localStorage.setItem('token',data.token)
                        localStorage.setItem('userinfo',JSON.stringify(data.userInfo))
                        getPermissions().then((data) => {
                            console.log("1111",data)
                            console.log("getPermissions" ,data)
                            store.commit('dynamicMenu',data)
                            console.log("routerList",routerList.value)
                            console.log("toRaw(routerList.value)",toRaw(routerList.value))
                            toRaw(routerList.value).forEach(item=>{
                                router.addRoute('main',item)
                            })
                            router.push('/')
                        })
                        
                    }

                })


            }
        } else {
            console.log('error submit', fields)
        }
    })

}

</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;
        }
    }

    .jump-link {
        /*
        text-align 是一个 CSS 属性，用于设置块级元素内部文本的水平对齐方式。
        常用的值包括：
        left：将文本左对齐（默认值）。
        right：将文本右对齐。
        center：将文本居中对齐。
        justify：使文本两端对齐，通常用于段落。
        text-align 主要影响块级元素（如 div、p）内的文本，而不影响块级元素本身的布局。
        块级元素（如 div、p、h1 等）会占据其父元素的整个可用宽度，除非设置了具体的宽度（如 width 属性）
        */
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>