// 导入仓库
import Vue from 'vue';
import store from 'store.js';
Vue.directive('power',{
    //inserted 元素插入达到页面中执行
    // el dom 元素绑定的dom元素
    // bind 参数 bind.value 获取指令后面设置的值

    inserted(el,bind) {
        // 自己的逻辑
        if(bind.value.indexOf(store.state.userIfo.role) == -1){
            // 比如移除dom元素
            el.parentNode.removeChild(el)
        }
    }
})