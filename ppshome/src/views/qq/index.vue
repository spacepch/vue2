<template>
  <!-- qq信息卡片 -->
  <pps-card>
    <!-- 输入框 -->
    <pps-input
      type="number"
      color="white"
      placeholder="输入QQ号"
      :content.sync="keyword"
      @keyup.13.native="qqSendAjax"
    >
      <pps-button type="warn" @click="handle">重置</pps-button>
      <pps-button type="primary" @click="qqSendAjax">查找</pps-button>
    </pps-input>
    <!-- 头像框 -->
    <pps-avatar
      :src="qqPart.content.avatar"
      :href="`https://user.qzone.qq.com/${keyword}`"
      defaultSrc="https://qlogo4.store.qq.com/qzone/2969476145/2969476145/100"
    ></pps-avatar>
    <!-- 信息栏 -->
    <pps-table-item
      v-for="(item, index) of navList"
      :key="index"
      :title="item"
      :content="qqPart.infoList[index]"
    >
    </pps-table-item>
  </pps-card>
</template>

<script>
import { qqFilter } from "@/private";
import { getQqinfoAPI } from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "my-qq",
  data() {
    return {
      keyword: "",
      navList: [
        { title: "QQ账号", haveToast: false },
        { title: "用户名", haveToast: false },
        { title: "手机号", haveToast: false },
        { title: "ip属地", haveToast: false },
      ],
    };
  },
  methods: {
    async qqSendAjax() {
      if (qqFilter(this.keyword)) return;
      if (this.keyword === "" || this.keyword === 0)
        return this.$message.warning("输入不能为空！");
      try {
        const {
          data: { avatar, name, phone, phonediqu },
        } = await getQqinfoAPI(this.keyword);
        const info = {
          infoList: [this.keyword, name, phone, phonediqu],
          content: { avatar },
        };
        this.$store.commit("updateQq", info);
      } catch (error) {
        this.$message.warning(error.message);
      }
    },
    handle() {
      this.$store.commit("updateQq", "");
      this.keyword = "";
    },
  },
  computed: {
    ...mapGetters(["qqPart"]),
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
