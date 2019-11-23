// 1. 导入axios
import axios from 'axios';
// 导入token 抽取层(因为要调用)
import { getToken } from '../utils/token.js';
// 2. 统一设置基地址
axios.defaults.baseURL =  'http://183.237.67.218:3002';
// 2.2 统一设置 跨域携带cookie
axios.defaults.withCredentials = true;

// 3. 暴露出去 有名字的暴露, 名字一般和接口地址一样
export function login(data){
    return axios ({
        url:"/login",
        method: "post",
        data
    })
}

// 暴露出去的 注册方法
export function register(data) {
    return axios({
        url:"/register",
        method: "post",
        data
    })
}

// 暴露出去的 获取短信验证码的方法
export function sendsms(data){
    return axios({
        url:"/sendsms",
        method:"post",
        data
    })
}
//获取用户信息
export function userInfo(){
    return axios({
        url:"/user/info",
        method:"get",
        headers:{
            token: getToken()
        }
    })
}