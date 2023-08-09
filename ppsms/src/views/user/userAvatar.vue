<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="!avatar" class="the_img" @click="chooseImg" src="../../assets/images/avatar.jpg" alt="" />
      <img v-else class="the_img" :src="avatar" alt="">

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" @click="uploadAvatarFn" :disabled="avatar === ''">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { uploadUserAvatarAPI } from '@/api'
export default {
  name: 'my-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    chooseImg () {
    // 模拟点击行为
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
    // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
      // 没有选择图片
        this.avatar = ''
      } else {
      // 选择了图片
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.avatar = e.target.result
        }
      }
    },
    uploadAvatarFn () {
      uploadUserAvatarAPI(this.avatar).then(({ data: res }) => {
        if (res.code) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$store.dispatch('getUserInfoActions')
      })
    }
  }
}
</script>

<style scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
    cursor: pointer;
}
.the_img:hover{
  filter: brightness(90%);
}
</style>
