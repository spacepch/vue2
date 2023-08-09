<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧菜单栏 -->
      <el-menu
        class="el-menu-top"
        background-color="#23262e"
        text-color="#fff"
        active-text-color="#409EFFF"
        mode="horizontal"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/favicon.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本材料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <!-- 侧边栏-欢迎区域 -->
        <div class="user-box">
          <img v-if="user_pic" :src="user_pic"/>
          <img v-else src="../../assets/images/logo.png"/>
          <span>欢迎{{ nickname || username }}！</span>
        </div>
        <!-- 左侧边栏-菜单区域 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262e"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="menuItem in menus">
            <!-- 无子级菜单 -->
            <el-menu-item v-if="!menuItem.children" :index="menuItem.indexPath" :key="menuItem.indexPath">
              <i :class="menuItem.icon"></i>{{menuItem.title}}
            </el-menu-item>

            <!-- 含子级菜单 -->
            <el-submenu v-else :index="menuItem.indexPath" :key="menuItem.indexPath">
              <template slot="title">
                <i :class="menuItem.icon"></i>
                <span>{{menuItem.title}}</span>
              </template>
              <!-- 渲染二级菜单 -->
              <el-menu-item v-for="childItem in menuItem.children" :index="childItem.indexPath" :key="childItem.indexPath">
                <i :class="childItem.icon"></i>{{childItem.title}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部区域 -->
        <el-footer>
          © &nbsp;
          <el-link href="https://spacepch.github.io">https://spacepch.github.io</el-link>
            - PPS开发者
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'
export default {
  name: 'my-layout',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    quitFn () {
      this.$confirm('此操作将退出次账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          localStorage.clear('isFirstEnter')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '取消退出！'
          })
        })
    },
    isFirstEnterFn () {
      // 第一次进入弹窗
      if (JSON.parse(localStorage.getItem('isFirstEnter'))) {
        return false
      } else {
        localStorage.setItem('isFirstEnter', false)
        this.$confirm('本站接口均属于黑马程序员！', '公示', {
          confirmButtonText: '已知',
          cancelButtonText: '关闭',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '已确认！'
            })
            localStorage.setItem('isFirstEnter', true)
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '未确认！'
            })
            return false
          })
      }
    },
    getMenusListFn () {
      getMenusListAPI().then(res => {
        this.menus = res.data.data
      })
    }
  },
  computed: {
    ...mapGetters(['user_pic', 'username', 'nickname'])
  },
  created () {
    this.getMenusListFn()
  },
  mounted () {
    this.isFirstEnterFn()
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
