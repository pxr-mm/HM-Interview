// 导入vue-router
import VueRouter from 'vue-router';
// 导入vue
import Vue from 'vue';

// 导入组件
// 登录页面组件
import login from '../views/login/loginmm.vue'
// 首页组件
import index from '../views/index/index.vue'


// use路由 
Vue.use(VueRouter);

// 创建路由规则
const routes = [
    {path:"/login", component:login},
    {path:"/index", component:index},
];

// 创建路由示例
const router = new VueRouter({
    routes
});

// 挂载到vue实例上
// 暴露出去
// 类似于module.exports = routera 
export default router;