// 导入vue-router
import VueRouter from 'vue-router';
// 导入vue
import Vue from 'vue';

import login from '../views/login/loginmm.vue'
// use 
Vue.use(VueRouter);
// 规则
const routes = [
    {path:"/login", component:login},
];

// 创建路由示例
const router = new VueRouter({
    routes
});

// 挂载到vue实例上
// 暴露出去
// 类似于module.exports = routera 
export default router;