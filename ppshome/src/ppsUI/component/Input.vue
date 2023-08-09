<template>
  <div :class="color" class="pps-input">
    <svg
      t="1689691213164"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3989"
      width="20"
      height="20"
    >
      <path
        d="M456.533333 104.533333c-187.733333 0-341.333333 153.6-341.333333 341.333334s153.6 341.333333 341.333333 341.333333 341.333333-153.6 341.333334-341.333333-153.6-341.333333-341.333334-341.333334z m0 618.666667c-151.466667 0-277.333333-123.733333-277.333333-277.333333s125.866667-277.333333 277.333333-277.333334 277.333333 123.733333 277.333334 277.333334-125.866667 277.333333-277.333334 277.333333zM902.4 883.2l-29.866667 29.866667c-8.533333 8.533333-21.333333 8.533333-29.866666 0l-192-192 59.733333-59.733334 192 192c8.533333 8.533333 8.533333 21.333333 0 29.866667z"
        fill="#2e2e2e"
        p-id="3990"
      ></path>
    </svg>
    <input :type="type" :placeholder="placeholder" v-model.trim="keyWord" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ppsInput",
  data() {
    return {
      keyWord: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default() {
        return "请输入内容";
      },
    },
    color: {
      type: String,
      default() {
        return "white";
      },
    },
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    content: {},
  },
  methods: {},
  watch: {
    keyWord() {
      this.$emit("update:content", this.keyWord);
    },
    content: {
      immediate: true,
      handler(n) {
        this.keyWord = n;
      },
    },
  },
};
</script>

<style scoped>
/*=============== 白色系搜索框设置 ===============*/
.white {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 36px;
  border: 2px solid #d3d5d7;
  border-radius: 10px;
  background: #e3e5e7;
}
.white input {
  outline: none;
  /* min-width: 60px; */
  width: 150px;
  height: 28px;
  background: none;
  border: none;
  font-size: 15px;
  color: #2e2e2e;
}
.white:focus-within {
  border-color: #409EFF;
  box-shadow: 0px 0px 2px 0px #409EFF;
}
.white:hover {
  border-color: #409EFF;
  transition: all 50ms linear 50ms;
}
input:hover {
  filter: brightness(70%);
}
.pps-input-error::placeholder {
  color: red;

  /*===================== end =====================*/
}

/*=============== 黑色系搜索框设置 ===============*/
.black {
  position: relative;
  height: 46px;
  border: 2px solid #8f8f8f;
  border-radius: 15px 15px 15px 15px;
  background: #2e2e2e;
}
.black input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  margin: auto;
  outline: none;
  width: 200px;
  height: 30px;
  background: none;
  border: none;
  font-size: 15px;
  color: #fff;
}
.black button {
  position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 50px;
  height: 35px;
  color: #2e2e2e;
  font-weight: bold;
}
.black input:focus {
  border-bottom: 2px solid #fff;
}
.black input:hover {
  filter: brightness(120%);
}
/*===================== end =====================*/
</style>
