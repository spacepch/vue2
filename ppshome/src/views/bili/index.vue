<template>
  <!-- bili信息卡片 -->
  <pps-card>
    <pps-input
      type="number"
      placeholder="输入B站uid"
      :content.sync="keyword"
      @keyup.13.native="biliSendAjax"
    >
      <pps-button type="warn" @click="handle">重置</pps-button>
      <pps-button type="primary" @click="biliSendAjax">查找</pps-button>
    </pps-input>
    <pps-avatar
      :src="biliPart.content.avatar"
      defaultSrc="https://static.hdslb.com/images/member/noface.gif"
    ></pps-avatar>
    <pps-table-item
      v-for="(item, index) in navList"
      :key="index"
      :title="item"
      :content="biliPart.infoList[index]"
    ></pps-table-item>
    <router-link
      :to="{
        name: 'biliUserCard',
      }"
      ><el-link type="primary" :underline="false" style="margin-left: 25px"
        >不知道uid？搜索昵称
      </el-link>
    </router-link>
  </pps-card>
</template>

<script>
import { getBiliInfoAPI } from "@/api";
import { mapGetters } from "vuex";
import { biliFilter } from "@/private";
import { levelFilter } from "@/plugins/bili";

export default {
  name: "my-bili",
  data() {
    return {
      keyword: "",
      navList: [
        { title: "用户名", haveToast: false },
        { title: "性别", haveToast: false },
        { title: "等级", haveToast: false },
        { title: "粉丝量", haveToast: false },
        { title: "关注情况", haveToast: false },
        { title: "会员情况", haveToast: false },
        { title: "个性签名", haveToast: true },
      ],
    };
  },
  methods: {
    async biliSendAjax() {
      if (biliFilter(this.keyword)) return;
      if (this.keyword === "") return this.$message.warning("输入不能为空！");
      try {
        const {
          data: { name, sex, fans, sign, level, isFollow, avatar },
        } = await getBiliInfoAPI(this.keyword);
        const nlevel = levelFilter(level);
        const nisFollow = isFollow ? "已关注" : "未关注";
        const nsex = this.sexFilter(sex)
        const nfans = this.fansFliter(fans)
        const info = {
          infoList: [name, nsex, nlevel, nfans, nisFollow, '接口懒得写了', sign],
          content: { avatar },
        };
        this.$store.commit("updateBili", info);
      } catch (error) {
        this.$message.warning(error.message);
      }
    },
    handle() {
      this.$store.commit("updateBili", "");
      this.keyword = "";
    },
    sexFilter(sex) {
      const male = `<svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20"><path d="M512 105.3c-220.7 0-399.7 179-399.7 399.7s179 399.7 399.7 399.7 399.7-179 399.7-399.7-179-399.7-399.7-399.7z m241.6 270.8h-0.5v175.4h-99.8v-90.1l-46.6 49.7c13.7 27.1 21.4 57.6 21.4 90 0 110.4-89.5 200-199.9 200s-199.9-89.5-199.9-200 89.5-200 199.9-200c36.1 0 70.1 9.6 99.3 26.4l48.3-51.4h-97.5v-99.7h275.3v99.7z" fill="#0091FF"></path>
            <path d="M428 501.5c-55.1 0-99.7 44.8-99.7 100s44.6 100 99.7 100 99.7-44.8 99.7-100-44.7-100-99.7-100z" fill="#0091FF"></path>
            </svg>`;
      const female = `<svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20"><path d="M512 105.5c-220.6 0-399.5 178.9-399.5 399.5S291.4 904.5 512 904.5 911.5 725.6 911.5 505 732.6 105.5 512 105.5z m200 621.9H561.5v75.1h-99.1v-75.1H312V627.3h150.4v-6.2c-33.6-8.6-65.5-25.9-91.8-52.2-78-78-78-204.5 0-282.5s204.5-78 282.5 0 78 204.5 0 282.5c-26.3 26.3-58.1 43.7-91.7 52.2v6.2h150.4v100.1h0.2z" fill="#FF4D94"></path>
          <path d="M582.4 356.1c-39.1-39.1-102.5-39.1-141.6 0-39.1 39.1-39.1 102.4 0 141.5 39.1 39.1 102.5 39.1 141.6 0 39.1-39 39.1-102.4 0-141.5z" fill="#FF4D94"></path>
          </svg>`;
      const nosex = `<svg viewBox="0 0 1024 1024" version="1.1" width="20" height="20"><path d="M554.666667 301.482667a320.042667 320.042667 0 1 1-85.333334 0V42.666667h85.333334v258.816zM512 853.333333a234.666667 234.666667 0 1 0 0-469.333333 234.666667 234.666667 0 0 0 0 469.333333z"></path></svg>`;
      switch (sex) {
        case "男":
          return male;
        case "女":
          return female;
        default:
          return nosex;
      }
    },
    fansFliter(num) {
      return (num.toString().length > 4) ? `${(num / 10000).toFixed(1)}万` : num;
    },
  },
  computed: {
    ...mapGetters(["biliPart"]),
  },
  created() {
    const uid = this.$route.query.uid;
    if (uid) {
      this.keyword = uid;
      this.biliSendAjax();
    }
  },
};
</script>

<style scoped>
.pps-card {
  width: 300px;
  height: fit-content;
  margin: 0 auto;
}
</style>
