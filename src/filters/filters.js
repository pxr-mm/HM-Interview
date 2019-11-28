// 导入Vue
import Vue from 'vue'
// 导入moment
import moment from 'moment'

Vue.filter('formatTime_global',(value)=>{
    return moment(value).format("YYYY年MM月DD日")
})

