import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入抽取的路由
import router from './router/router.js'

// 导入md5加密加盐包(下载)
import md5 from 'js-md5';
// 添加到vue的 原型中
Vue.prototype.$md5 = md5;

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入自己的全局样式
import './style/base.css'


new Vue({
  render: h =>h(App),
  router,
  // md5,
}).$mount('#app')
