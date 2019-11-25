// 1. 导入axios
import axios from 'axios';
// 导入token 抽取层(因为要调用)
import { getToken, removeToken } from '../utils/token.js';
// 导入element-uide弹框(使用axios拦截器的时候用到弹框)
import { Message } from 'element-ui';
// 导入路由
import router from '../router/router.js';

// 2. 统一设置基地址
axios.defaults.baseURL = 'http://183.237.67.218:3002';
// 2.2 统一设置 跨域携带cookie
axios.defaults.withCredentials = true;



// 统一设置 axios 拦截器
// 请求拦截器
// 请求发送 之前
// config 是当前这次请求的 各种设置
// 可以统一设置header
axios.interceptors.request.use(
    function (config) {
        // 为consfig统一设置token
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 响应拦截器
// axios 直接使用的.then之前
// response 服务器响应的内容
axios.interceptors.response.use(
    function (response) {
        // 判断token
        // if (response.data.data.code === 0) {   //该逻辑不严谨,很多的报错code都是0
        // 多加判断条件
        if (response.data.data.code === 0 && response.data.message.indexOf('token')) { 
            // 提示
            // Message.error("小老弟,伪造token,牛逼");
            // 直接使用服务器返回的信息提示用户
            Message.error(response.data.message);
            // 删除token
            removeToken();
            // 去登录页面
            router.push("/login");
            return;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }

);



// 3. 暴露出去 有名字的暴露, 名字一般和接口地址一样
export function login(data) {
    return axios({
        url: "/login",
        method: "post",
        data
    })
}

// 暴露出去的 注册方法
export function register(data) {
    return axios({
        url: "/register",
        method: "post",
        data
    })
}

// 暴露出去的 获取短信验证码的方法
export function sendsms(data) {
    return axios({
        url: "/sendsms",
        method: "post",
        data
    })
}
//获取用户信息
export function userInfo() {
    return axios({
        url: "/user/info",
        method: "get",
        headers: {
            token: getToken()
        }
    })
}



// 作用域 抽取学科接口
// subject.add subject.remove
export const subject ={
  // 新增
  add(data){
    return axios({
      url:"/subject/add",
      method:"post",
      data
    })
  },
  // 列表
  // get请求的参数用params来传递
  list(params){
    return axios({
      url:"/subject/list",
      method:"get",
      params
    })
  },
  // 状态
  status(data){
    return axios({
      url:"/subject/status",
      method:"post",
      data
    })
  },
  // 编辑
  edit(data){
    return axios({
      url:"/subject/edit",
      method:"post",
      data
    })
  },
  // 删除
  remove(data){
    return axios({
      url:"/subject/remove",
      method:"post",
      data
    })
  },
}
