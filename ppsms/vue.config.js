const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: '/'
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  configureWebpack: {
    externals: {
      echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      dayjs: 'dayjs',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vuex-persistedstate': 'createPersistedState'
    }
  }
})
