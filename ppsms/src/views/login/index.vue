<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-box"></div>
      <el-form ref="loginRef" :model="loginForm" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="loginFn"
            >登录</el-button
          >
          <el-link :underline="false" @click="$router.push('/register')"
            >去注册</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      loginForm: {
        // 表单数据对象
        username: '',
        password: ''
      },
      rulesObj: {
        // 表单规则对象
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginFn () {
      this.$refs.loginRef.validate(async callback => {
        if (callback) {
          const { data: res } = await loginApi(this.loginForm)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.updateToken(res.token)
          this.$router.push('/')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  background: url("../../assets/images/home.jpg") center;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;

    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
