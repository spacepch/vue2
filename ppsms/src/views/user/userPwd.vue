<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form
      ref="pwdFormRef"
      :model="pwdForm"
      :rules="pwdFormRules"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认原密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updatePwdAPI } from '@/api'
export default {
  name: 'my-user',
  data () {
    const samePwd = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        callback(new Error('新密码不能与原密码相同！'))
      } else {
        callback()
      }
    }
    const rePwd = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePwdFn () {
      this.$refs.pwdFormRef.validate(async valid => {
        if (!valid) return false

        const { data: res } = await updatePwdAPI(this.pwdForm)
        if (res.code !== 0) return this.$message.error('更新失败,请检查原密码是否有误！')

        this.$message.success('更新成功！')
        this.$refs.pwdFormRef.resetFields()

        this.$store.commit('updateUserInfo', '')
        this.$store.commit('updateToken', '')
        this.$router.push('/login')
        this.$notify.warning('请重新登录！')
      })
    },
    resetFn () {
      this.$refs.pwdFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
