import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入抽取的路由
import router from './router/router.js'

new Vue({
  render: h =>h(App),
  router,
}).$mount('#app')
