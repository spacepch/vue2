import Vue from 'vue'

import App from './App.vue'
import ppsUI from '@/ppsUI/packages'
import '@/elementUI/index.js'
import 'less'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(ppsUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
