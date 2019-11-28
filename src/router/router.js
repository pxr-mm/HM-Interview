// 导入vue-router
import VueRouter from 'vue-router';
// 导入vue
import Vue from 'vue';
// use路由 
Vue.use(VueRouter);
// vue-router更新到3.1版本之后 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 导入Element-ui的弹框
import { Message } from "element-ui";
// 导入 仓库
import  store  from '../store/store.js';

// 导入 获取token的方法(调整-路由白名单)
import { getToken} from '../utils/token.js'

// (调整---权限模块 - 用户信息拉取前置)
// 导入 用户信息获取
import {userInfo} from '../api/api.js';


// 导入组件
// 登录页面组件
import login from '../views/login/loginmm.vue'
// 首页组件
import index from '../views/index/index.vue'



// 2.1导入首页的嵌套组件
import enterprise from '../views/index/enterprise/enterprise.vue';
import subject from '../views/index/subject/subject.vue';
import user from '../views/index/user/user.vue';
import Datashow from '../views/index/Datashow/Datashow.vue';
import itemslist from '../views/index/itemslist/itemslist.vue';





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


// 导航守卫
router.beforeEach((to,from, next)=>{
    // 路由白名单
    const whitePaths = ["/login"];
    // 判断是否存在白名单中 to.path 路径 比如: /index  /login
    if (whitePaths.indexOf(to.path) != -1) {
        // 存在白名单 放走 
        return next()
    }
    // 如果是登录状态的  token存在 也放走
    if (getToken()) {
        // 存在
        // 调用接口验证对错 异步操作
        return userInfo().then(res => {
          // 用户信息获取成功 token木有问题
          store.commit("CHANGEINFO", res.data.data);

        //   判断 (用户管理权限)状态 如果用户的状态是禁用的 0 提示  转去登录页面
        // if(res.data.data.status === 0) {
        //     // 禁用
        //     Message.warning("请等待管理员启用");
        //     return next("/login");
        // }
          // 放走
          next();
        });
        // return next();
      }

    // 说明不是白名单 也没登录 没有token
    Message("请先登录")
    next("/login")
    

})

// 挂载到vue实例上
// 暴露出去
// 类似于module.exports = routera 
export default router;