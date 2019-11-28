// 导入vue
import Vue from "vue";

// 导入 Vuex
import Vuex from "vuex";
// use一下
Vue.use(Vuex);
// 创建仓库
const store = new Vuex.Store({
    // 数据
    state: {
        // 用户信息
        userInfo: null
    },
    // 修改数据 的方法
    mutations: {
        // 全部大写(增加修改用户数据)
        CHANGEINFO(state, info) {
            // 直接保存
            state.userInfo = info;
        }

    }
})

// 暴露出去
export default store;