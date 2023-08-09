<template>
  <main ref="child">
    <!-- <router-link class="router" active-class="current" to="/qqCard"
      >QQ卡片</router-link
    >
    <router-link class="router" active-class="current" to="/biliCard"
      >bili卡片</router-link
    >
    <router-link class="router" active-class="current" to="/githubCard"
      >github卡片</router-link
    > -->
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    isFirstEnterFn() {
      // 第一次进入弹窗
      if (JSON.parse(localStorage.getItem("isFirstEnter"))) {
        return false;
      } else {
        localStorage.setItem("isFirstEnter", false);
        this.$confirm(
          `本站接口因部署在vercel，若请求失败，请尝试vpn！本站均由作者编写！
        本站功能未写完，就此不打算继续了，后期可能会更新！`,
          "公示",
          {
            confirmButtonText: "已知",
            cancelButtonText: "关闭",
            type: "warning",
            lockScroll: false,
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "已确认！",
            });
            localStorage.setItem("isFirstEnter", true);
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "未确认！",
            });
            return false;
          });
      }
    },
  },
  mounted() {
    this.isFirstEnterFn();
  },
};
</script>

<style lang="css" scoped>
@font-face {
  font-family: "uufont";
  src: url(@/assets/uui.3d6fecb8.woff2);
  font-weight: 400;
}
@font-face {
  font-family: "bilifont";
  src: url(@/assets/HarmonyOS_Medium.a1.woff2);
}
</style>
