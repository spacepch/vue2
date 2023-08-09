<template>
  <div ref="root" class="root">
    <router-view></router-view>
  </div>
</template>

<script>
// import { getUserInfoAPI } from '@/api'
// import { registerAPI } from '@/api'
export default {
  name: 'App',
  mounted () {

  }
}
</script>

<style lang='less' scoped>
.root{
  height: 100%;
}
</style>
