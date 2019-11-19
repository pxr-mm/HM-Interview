import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入抽取的路由
import router from './router/router.js'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  render: h =>h(App),
  router,
}).$mount('#app')
