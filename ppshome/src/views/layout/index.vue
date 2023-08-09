<template>
  <section>
    <!-- 导航栏 -->
    <nav>
      <div>
        <!-- 遮罩层 -->
        <div
          class="menuMask"
          @click="closeMenu"
          :class="{ active: isAsideShow }"
        ></div>
        <!-- 菜单按钮-移动端 -->
        <div class="menu" @click="handleMenuFn">
          <svg viewBox="0 0 1024 1024" width="30" height="30">
            <path
              d="M832.2 264.6H192.3c-35.2 0-64-28.8-64-64s28.8-64 64-64h639.8c35.2 0 64 28.8 64 64 0.1 35.2-28.7 64-63.9 64z m0 313.3H196.1c-35.2 0-64-28.8-64-64s28.8-64 64-64h636.1c35.2 0 64 28.8 64 64s-28.8 64-64 64z m0 319H192.3c-35.2 0-64-28.8-64-64s28.8-64 64-64h639.8c35.2 0 64 28.8 64 64 0.1 35.2-28.7 64-63.9 64z"
              fill="#409eff"
            ></path>
          </svg>
        </div>
        <!-- logo -->
        <div class="left">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
        <!-- 导航栏-pc -->
        <div class="pc-list">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @select="1"
            background-color="#00000000"
            text-color="#2e2e2e"
            active-text-color="#409EFF"
            mode="horizontal"
            router
          >
            <el-menu-item
              :index="obj.path"
              v-for="(obj, index) in navList"
              :key="index"
            >
              <span slot="title">{{ obj.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 导航栏-移动端 -->
        <transition>
          <div class="me-list" v-show="isAsideShow">
            <div class="me-logo">
              <img src="@/assets/img/me-logo-f.jpg" alt="" />
            </div>
            <div class="log">
              <img src="@/assets/img/w-avatar.png" alt="" />
              <div class="name">
                Painchornds
                <p>一个小白，前端爱好者</p>
              </div>
            </div>
            <pps-card>
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @select="closeMenu"
                background-color="#00000000"
                text-color="#2e2e2e"
                active-text-color="#f79f1f"
                router
              >
                <el-menu-item
                  :index="obj.path"
                  v-for="(obj, index) in navList"
                  :key="index"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ obj.title }}</span>
                </el-menu-item>
              </el-menu>
            </pps-card>
          </div>
        </transition>
        <!-- 登录 -->
        <div class="right"></div>
      </div>
    </nav>

    <!-- banner -->
    <header class="pps-header">
      <div class="banner">
        <img src="@/assets/img/banner-m.jpg" alt="" />
      </div>
      <div class="head-title">
        <div>
          <div class="left">
            <img src="@/assets/img/avatar.png" alt="" />
          </div>
          <div class="right">
            <div class="title">
              <div>接口数量</div>
              <span>123</span>
            </div>
            <div class="title">
              <div>接口数量</div>
              <span>123</span>
            </div>
            <div class="title">
              <div>接口数量</div>
              <span>123</span>
            </div>
            <div class="title">
              <div>接口数量</div>
              <span>123</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 内容部分 -->
    <main class="pps-main">
      <!-- 左边栏 -->
      <pps-card class="left">
        <div class="introduction">
          <div class="name">
            <span>Painchornds</span>
            <i class="el-icon-info" style="color: #409eff"></i>
            <p>2606249268@qq.com</p>
          </div>
          <div class="projects">
            <div v-for="(obj, index) in projects" :key="index">
              <i :class="obj.icon"></i>
              <el-link :href="obj.link" target="blank" :underline="false">{{
                obj.content
              }}</el-link>
            </div>
          </div>
          <pps-button
            type="confirm"
            style="
              border-radius: 5px;
              width: 100%;
              margin: 0 auto;
              font-weight: 200;
              color: #fff;
              height: 40px;
              background-color: #409eff;
            "
            >关于本站更多信息</pps-button
          >
        </div>
      </pps-card>
      <!-- 主体内容 -->
      <pps-card class="center">
        <div class="data">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="breadcrumbItem in breadcrumbList"
              :key="breadcrumbItem.path"
              :to="{ path: breadcrumbItem.path }"
            >
              <a> {{ breadcrumbItem.meta.title }} </a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </pps-card>
      <!-- 右边栏 -->
      <pps-card class="right">
        <div>技术栈：</div>
        <br />
        <el-collapse>
          <el-collapse-item title="vue2" name="1">
            <div>Vue是一套用于构建用户界面的前端框架。</div>
            <div>
              基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API
              和一流的文档。
            </div>
            <div>
              经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化。
            </div>
            <div>
              丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如。
            </div>
          </el-collapse-item>
          <el-collapse-item title="vue-cli" name="2">
            <div>Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统</div>
            <div>
              Vue CLI 致力于将 Vue
              生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需
              eject。
            </div>
          </el-collapse-item>
          <el-collapse-item title="element-ui" name="3">
            <div>
              Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0
              的桌面端组件库
            </div>
          </el-collapse-item>
          <el-collapse-item title="pps-ui" name="4">
            <div>
              pps-ui，是作者基于 Vue 2.0，参照elementUI底层源码为自己设计的
              的桌面端组件库
            </div>
          </el-collapse-item>
          <el-collapse-item title="vuex" name="5">
            <div>
              Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 +
              库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
        <br />
        <div>后端：</div>
        <li>express--Node.js</li>
        <li>vercel平台托管serverless API</li>
      </pps-card>
    </main>

    <!-- 返回顶部 -->
    <el-backtop :bottom="100" :visibility-height="10">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #409eff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            text-align: center;
            line-height: 40px;
            color: #fff;
          }
        "
      >
        up
      </div>
    </el-backtop>

    <!-- 底部 -->
    <footer class="pps-footer">
      <div>
        <p>版权申明</p>
        <p>看什么看还没上域名呢</p>
        <p>
          本站内容均为原创，未套用任何博客模板，组件库均为自己编写，用到少数elementUI
        </p>
        <p>CopyRight@ 2023 Painchornds</p>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: "my-layout",
  data() {
    return {
      navList: [
        { title: "首页", path: "/home" },
        { title: "qq接口", path: "/qqCard" },
        { title: "bili接口", path: "/biliCard" },
        { title: "biliUser接口", path: "/biliUserCard" },
        { title: "git接口", path: "/githubCard" },
      ],
      isAsideShow: false,
      projects: [
        {
          content: "主页旧址",
          link: "https://spacepch.github.io/",
          icon: "el-icon-s-home",
        },
        {
          content: "GitHub",
          link: "https://github.com/spacepch",
          icon: "el-icon-link",
        },
        { content: "", link: "" },
        { content: "", link: "" },
      ],
    };
  },
  methods: {
    handleMenuFn() {
      this.isAsideShow = !this.isAsideShow;
    },
    closeMenu() {
      this.isAsideShow = false;
    },
    listRouterFn(path) {
      this.closeMenu();
      this.$router.replace(path);
    },
  },
  computed: {
    breadcrumbList() {
      return this.$route.matched;
    },
  },
};
</script>

<style lang="less" scoped>
section {
  font-family: uufont;
  box-sizing: border-box;
  background-color: #f2f2f2;
}
.v-enter,
.v-leave-to {
  transform: translateX(-250px);
}
.v-enter-active,
.v-leave-active {
  transition: 0.3s ease-in-out;
}
.v-enter-to,
.v-leave {
  transform: translateX(0);
}
nav {
  position: sticky;
  top: 0px;
  width: 100%;
  background-color: #ffc312;
  box-shadow: inset 0 0 20px 1px #f79f1f, 0 0 10px 0 #ffc4129b;
  height: 55px;
  z-index: 6;

  > div {
    display: flex;
    align-items: center;
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
  }

  .menu {
    display: none;
    cursor: pointer;
    height: 30px;
    width: 30px;
    margin-left: 10px;
  }

  & .left {
    width: 120px;
    height: 100%;
    transition: all 0.4s ease;
  }

  & .pc-list {
    flex-grow: 1;

    & ul {
      display: flex;
      flex-direction: row;
      list-style: none;
    }

    & li {
      margin: 0 10px;
    }

    .el-menu.el-menu--horizontal {
      border: none !important;

      .el-menu-item {
        height: 55px;
        line-height: 55px;
      }
      .el-menu-item.is-active {
        border-width: 3px;
        font-weight: 500;
      }
    }

    /* 修改导航菜单栏悬浮时的背景颜色 */
    .el-submenu__title:hover,
    .el-menu-item:focus,
    .el-menu-item:hover {
      background-color: transparent !important;
      border-bottom: 3px solid #409eff !important;
      color: #409eff !important;
      transition: all 0.2s ease;
    }
  }

  & .me-list {
    position: fixed;
    top: 0;
    left: 0;
    height: calc(100% + 24px);
    width: 260px;
    background-color: #ffc312;
    box-shadow: inset 0 0 20px 1px #f79f1f;

    & .pps-card {
      position: relative;
      top: -20px;
      margin: 10px;
      background-color: #ffffffc5;
    }

    & .me-logo {
      width: 260px;
    }

    & .log {
      display: flex;
      flex-direction: row;
      position: relative;
      top: -30px;
      width: auto;
      padding: 10px;
      margin: 10px;
      background-color: #ffffffc5;
      border-radius: 8px;
      box-shadow: 0px 0px 20px -5px rgba(158, 158, 158, 0.22);
      & img {
        width: 45px;
        border-radius: 8px;
        margin-right: 10px;
      }
      & p {
        margin: 0;
        font-size: 10px;
        color: #5e5e5e;
      }
    }

    & img {
      width: 260px;
    }

    .el-menu {
      border: none;
    }
  }

  & .right {
    width: 120px;
    height: 100%;
    transition: all 0.4s ease;

    @media screen and (max-width: 995px) {
      width: 40px;
    }
  }
}
.menuMask {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}
.active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
header {
  width: 100%;

  & .banner {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 280px;
    text-align: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
      transform: scale(1.1);
    }

    & img {
      position: relative;
      height: 100%;
      left: 100px;
    }

    @media screen and (max-width: 996px) {
      height: 200px;
    }
    @media screen and (max-width: 510px) {
      height: 150px;
      & img {
        left: 0;
      }
    }
  }
  & .head-title {
    height: 60px;
    background-color: #fff;
    padding: 0 28px;

    > div {
      position: relative;
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;
      background-color: #fff;
    }
    & .left {
      & img {
        position: absolute;
        left: 5px;
        bottom: -26px;
        width: 160px;
        height: 160px;
        box-sizing: border-box;
        border-radius: 15px;
        border: 8px solid #ffffff54;
        transition: all 0.3s ease;
        cursor: pointer;
        z-index: 1;

        &:hover {
          // transform: scale(1.1);
          border-color: rgba(64, 160, 255, 0.577);
          border-width: 5px;
          border-radius: 50%;
        }

        @media screen and (max-width: 730px) {
          width: 100px;
          height: 100px;
          bottom: 5px;
          left: -20px;
        }

        @media screen and (max-width: 996px) {
          bottom: 0px;
        }
      }
    }
    & .right {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 190px;
      transition: all 0.4s ease;

      @media screen and (max-width: 730px) {
        margin-left: 80px;
      }

      & .title {
        width: auto;
        margin-left: 20px;
        text-align: center;
        font-size: 13px;
        color: #2e2e2e;
        background-color: #fff;

        @media screen and (max-width: 730px) {
          margin-left: 10px;
        }
      }
    }
  }
}
.pps-main {
  display: flex;
  justify-content: space-between;
  margin: 10px auto 0;
  max-width: 1400px;
  box-sizing: border-box;

  > .pps-card {
    min-height: 30vh;
    padding: 10px;
    border-radius: 5px;
    margin: 0;
    border: none;
    background-color: #fff;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.144);
  }

  & .left {
    position: sticky;
    top: 70px;
    width: 22%;
    height: fit-content;
    margin-top: 20px;
    transition: all 0.4s ease;
    color: #747474;

    & .introduction {
      & .name {
        margin-left: 10px;
        font-size: 12px;
        & span,
        i {
          font-size: 20px;
          margin-right: 5px;
        }
        & p {
          margin: 0;
        }
      }
      & .projects {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }

  & .right {
    position: sticky;
    top: 70px;
    height: 700px;
    width: 22%;
    transition: all 0.4s ease;
    box-sizing: border-box;
    padding: 25px;
  }

  & .center {
    width: calc(56% - 20px);
    margin: 0 10px;
    transition: all 0.4s ease;
    box-sizing: border-box;

    & .pps-card {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.144);
    }
  }

  & .data {
    display: flex;
    align-items: center;
    position: sticky;
    top: 55px;
    width: 100%;
    height: 30px;
    margin-bottom: 5px;
    background-color: #fff;
    z-index: 5;
  }
}
footer {
  display: flex;
  align-items: center;
  position: relative;
  height: 200px;
  margin: 10px auto 0;
  background-color: #ffc312;
  box-shadow: inset 0 0 20px 1px #f79f1f;
  & div {
    width: 100%;
    height: fit-content;
    & p {
      color: #515365aa;
      text-align: center;
      font-size: 12px;
    }
  }
}
@media screen and (min-width: 996px) and (max-width: 1199px) {
  .pps-main .left {
    width: 22%;
  }
  .pps-main .center {
    width: calc(78% - 10px);
  }
  .pps-main .right {
    display: none;
  }
}
@media screen and (max-width: 995px) {
  nav .menu {
    display: block;
  }
  nav .left {
    margin: 0 auto;
  }
  nav .pc-list {
    display: none;
  }
  .pps-main {
    min-height: calc(30vh);
    .left {
      display: none;
    }
    .center {
      width: 100%;
      margin: 0;
    }
    .right {
      display: none;
    }
  }
}
</style>
