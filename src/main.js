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

// 导入仓库
import store from './store/store.js'

// 导入 全局过滤器 必须在 new Vue示例之前
// 只是为了执行，导入即可
import "./filters/filters.js";

// 导入自定义指令  必须在new Vue实例之前
// 知识为了执行而已(作用:  权限管理-按钮级别限制,哪里需要用到那个指令的限制,就添加在directive.js定义的自定义指令"v-指令")
import "./directive/directive.js";


new Vue({
  render: h =>h(App),
  router,
  // 挂载到vue实例 - 仓库
  store,
}).$mount('#app')
