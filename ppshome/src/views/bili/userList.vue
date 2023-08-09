<template>
  <pps-card>
    <pps-input :content.sync="searchParams.keyword" @keyup.13.native="searchFn">
      <div>
        <pps-button type="warn" @click="resetFn">重置</pps-button>
        <pps-button type="primary" @click="searchFn">搜索</pps-button>
      </div>
    </pps-input>

    <!-- 用户类型 -->
    <div class="usertype-list">
      <pps-button
        v-for="(item, index) in user_type"
        :key="index"
        :type="active_user == index ? 'primary' : ''"
        @click="userTypeFn(item, index)"
      >
        {{ item.text }}
      </pps-button>
    </div>

    <!-- 用户数据 -->
    <div class="conditions-list">
      <el-dropdown @command="sortFn" trigger="click">
        <pps-button type="confirm"
          >更多菜单<i class="el-icon-arrow-down el-icon--right"></i
        ></pps-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in conditions"
            :key="index"
            :command="item"
          >
            {{ item.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 统计条数 -->
    <el-statistic
      group-separator=","
      :precision="0"
      :value="searchParams.total"
      title="总条数"
    ></el-statistic>

    <!-- 数据表格 -->
    <el-table
      :data="userList"
      style="width: 100%"
      class="table-fixed-header"
      height="400"
    >
      <el-table-column label="头像">
        <template slot-scope="obj">
          <pps-avatar :size="40" :src="obj.row.upic"></pps-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="uname" label="用户名"> </el-table-column>
      <el-table-column prop="mid" label="uid"> </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="obj">
          <span v-html="$options.filters.sexFilter(obj.row.gender)"></span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝">
        <template slot-scope="obj">
          {{fansFliter(obj.row.fans)}}
        </template>
      </el-table-column>
      <el-table-column label="详细信息">
        <template slot-scope="obj">
          <pps-button type="confirm" @click="jumpFn(obj.row.mid)"
            >跳转</pps-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 换页 -->
    <div class="pageBtn">
      <pps-button type="confirm" @click="prePageFn">上一页</pps-button>
      <pps-button>{{ this.currentPage }}</pps-button>
      <pps-button type="confirm" @click="nextPageFn">下一页</pps-button>
      <router-link
      :to="{
        name: 'biliCard',
      }"
      ><el-link type="primary" :underline="false" style="margin-left: 25px"
        >用uid搜索?
      </el-link>
    </router-link>
    </div>
  </pps-card>
</template>

<script>
import { getBiliUserListAPI } from "@/api";

export default {
  name: "my-search-list",
  methods: {
    jumpFn(obj) {
      this.$router.push({ name: "biliCard", query: { uid: obj } });
    },
    async sendAjax() {
      if (!this.searchParams.page) this.searchParams.page = 1;
      const { data: res } = await getBiliUserListAPI(
        this.searchParams.keyword,
        this.searchParams.page,
        this.searchParams.page_size,
        this.searchParams.order,
        this.searchParams.order_sort,
        this.searchParams.user_type
      );
      this.searchParams.page_num = res.data.numPages;
      this.searchParams.total = res.data.numResults;
      this.userList = res.data.result;
    },
    searchFn() {
      this.searchParams.page = 1;
      if (this.searchParams.keyword === "")
        return this.$message.warning("输入不能为空！");
      this.sendAjax();
    },
    nextPageFn() {
      if (!this.searchParams.keyword || !this.searchParams.total)
        return this.$message.warning("无更多内容！");
      this.searchParams.page++;
      this.sendAjax();
    },
    prePageFn() {
      if (this.searchParams.page <= 1)
        return this.$message.warning("已经是第一页了！");
      this.searchParams.page--;
      this.sendAjax();
    },
    resetFn() {
      this.userList = [];
      this.searchParams = {
        keyword: "",
        page: 0,
        page_num: 0,
        page_size: 10,
        total: 0,
        order: "",
        order_sort: 0,
        user_type: 0,
      };
    },
    sortFn(command) {
      this.searchParams.order = command.order;
      this.searchParams.order_sort = command.sort;
      if (this.searchParams.keyword === "") return;
      this.sendAjax();
    },
    userTypeFn(item, index) {
      this.searchParams.user_type = item.sort;
      this.active_user = index;
      if (this.searchParams.keyword === "") return;
      this.sendAjax();
    },
    fansFliter(num) {
      return (num.toString().length > 4) ? `${(num / 10000).toFixed(1)}万` : num;
    },
  },
  data() {
    return {
      searchParams: {
        keyword: "",
        page: 0,
        page_num: 0,
        page_size: 10,
        total: 0,
        order: "",
        order_sort: 0,
        user_type: 0,
      },
      userList: [
        // {
        //   avatar: "",
        //   name: "",
        //   uid: "",
        //   sex: "",
        //   fans: "",
        // },
      ],
      conditions: [
        { text: "默认排序", order: "", sort: 0 },
        { text: "等级由高到低", order: "level", sort: 0 },
        { text: "等级由低到高", order: "level", sort: 1 },
        { text: "粉丝由高到低", order: "fans", sort: 0 },
        { text: "粉丝由低到高", order: "fans", sort: 1 },
      ],
      user_type: [
        { text: "全部用户", sort: 0 },
        { text: "up主用户", sort: 1 },
        { text: "普通用户", sort: 2 },
        { text: "认证用户", sort: 3 },
      ],
      active_user: 0,
      numResults: 0,
    };
  },
  computed: {
    currentPage() {
      return `${this.searchParams.page} / ${this.searchParams.page_num}`;
    },
  },
  filters: {
    sexFilter(value) {
      const male = `<svg viewBox="0 0 1024 1024" version="1.1" width="25" height="25"><path d="M512 105.3c-220.7 0-399.7 179-399.7 399.7s179 399.7 399.7 399.7 399.7-179 399.7-399.7-179-399.7-399.7-399.7z m241.6 270.8h-0.5v175.4h-99.8v-90.1l-46.6 49.7c13.7 27.1 21.4 57.6 21.4 90 0 110.4-89.5 200-199.9 200s-199.9-89.5-199.9-200 89.5-200 199.9-200c36.1 0 70.1 9.6 99.3 26.4l48.3-51.4h-97.5v-99.7h275.3v99.7z" fill="#0091FF"></path>
            <path d="M428 501.5c-55.1 0-99.7 44.8-99.7 100s44.6 100 99.7 100 99.7-44.8 99.7-100-44.7-100-99.7-100z" fill="#0091FF"></path>
            </svg>`;
      const female = `<svg viewBox="0 0 1024 1024" version="1.1" width="25" height="25"><path d="M512 105.5c-220.6 0-399.5 178.9-399.5 399.5S291.4 904.5 512 904.5 911.5 725.6 911.5 505 732.6 105.5 512 105.5z m200 621.9H561.5v75.1h-99.1v-75.1H312V627.3h150.4v-6.2c-33.6-8.6-65.5-25.9-91.8-52.2-78-78-78-204.5 0-282.5s204.5-78 282.5 0 78 204.5 0 282.5c-26.3 26.3-58.1 43.7-91.7 52.2v6.2h150.4v100.1h0.2z" fill="#FF4D94"></path>
          <path d="M582.4 356.1c-39.1-39.1-102.5-39.1-141.6 0-39.1 39.1-39.1 102.4 0 141.5 39.1 39.1 102.5 39.1 141.6 0 39.1-39 39.1-102.4 0-141.5z" fill="#FF4D94"></path>
          </svg>`;
      const nosex = `<svg viewBox="0 0 1024 1024" version="1.1" width="25" height="25"><path d="M554.666667 301.482667a320.042667 320.042667 0 1 1-85.333334 0V42.666667h85.333334v258.816zM512 853.333333a234.666667 234.666667 0 1 0 0-469.333333 234.666667 234.666667 0 0 0 0 469.333333z"></path></svg>`;
      switch (value) {
        case 1:
          return male;
        case 2:
          return female;
        default:
          return nosex;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.table-fixed-header {
  height: 450px !important;
}
@media screen and (max-width: 730px) {
  .table-fixed-header {
    max-height: 300px !important;
  }
}
@media screen and (min-width: 500px) {
  .pps-input {
    width: 380px;
  }
}
.conditions-list {
  & button {
    margin-top: 5px;
  }
}
.usertype-list {
  margin-top: 5px;
}
</style>
