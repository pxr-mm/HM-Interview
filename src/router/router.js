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


// 2.1导入首页的嵌套组件
import enterprise from '../views/index/enterprise/enterprise.vue';
import subject from '../views/index/subject/subject.vue';
import user from '../views/index/user/user.vue';
import Datashow from '../views/index/Datashow/Datashow.vue';
import itemslist from '../views/index/itemslist/itemslist.vue';

// use 
Vue.use(VueRouter);

// 创建路由规则
const routes = [
    { path: "/login", component: login },
    // { path: "/index", component: index },

    { path: "/", redirect: "index" },  //重定向,  默认跳到首页
    {
        path: "/index", component: index,

        // 2.2index组件的子路由(嵌套组件的路由)
        children: [
            { path: "", redirect: "Datashow" },
            // 子路由路径不需要加"/"
            { path: "enterprise", component: enterprise },
            { path: "subject", component: subject },
            { path: "user", component: user },
            { path: "Datashow", component: Datashow },
            { path: "itemslist", component: itemslist },
        ]
    },

];

// 创建路由示例
const router = new VueRouter({
    routes
});

// 挂载到vue实例上
// 暴露出去
// 类似于module.exports = routera 
export default router;