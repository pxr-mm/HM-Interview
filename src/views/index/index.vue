<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <!-- 顶部的图标，点击旋转 -->
        <i
          class="el-icon-s-fold"
          @click="isCollapse = !isCollapse"
          :class="{ rotate: isCollapse }"
        ></i>
        <img class="logo" src="../../assets/index.logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="getIcon" alt="" />
        <span class="name">{{getName}}, 您好</span>
        <el-button class="logout" size="mini" type="primary" @click="logout">退出</el-button>
        <!-- <el-button type="text" @click="open"></el-button> -->
      </div>
    </el-header>
    
    <el-container>
      <!-- 左侧
         style="width:auto" 让宽度自适应 被内容撑开
       -->
      <el-aside style="width:auto" class="aside">
        <!-- 注意点:  有router 才能点击菜单列表时切换到子页面 
        isCollapse: 菜单是否重叠
        -->
        <el-menu
          :collapse="isCollapse"
          default-active="5"
          class="el-menu-vertical-demo"
          router 
        >
        <!-- 作用: 数据预览页面只有老师和管理员能看的见,学生看不见 -->
          <el-menu-item v-if="['管理员','老师','学生'].indexOf(getRole) != -1" index="Datashow">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员'].indexOf(getRole) != -1" index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师'].indexOf(getRole) != -1" index="itemslist">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师'].indexOf(getRole) != -1" index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item v-if="['管理员','老师','学生'].indexOf(getRole) != -1" index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入获取token的函数  
// 移除getToken  (调整-路由白名单)
import {removeToken} from "../../utils/token.js"
// (调整---权限模块 - 用户信息拉取前置)
// import {userInfo} from "../../api/api.js"
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 头像 
      avatar:'',
      // 用户名
      name:"",
    };
  },
  methods:{
    // 用户退出 
    logout() {
        this.$confirm('主人,你确定要离开吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除token
            removeToken();
            
            // 删除仓库的数据(用户退出的时候，移除token的同时，移除仓库中的信息)
            this.$store.commit("CHANGEINFO",null);
            // 去登录页
            this.$router.push("/login");
            
          })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      }
    },
 

  // 生命周期钩子
  beforeCreate() {

    // ------------------- 移除token判断 (调整-路由白名单)
    // // 判断token是否存在
    // const token = getToken();
    // if(!token) {
    //   // 如果token不存在
    //   // 提示用户
    //   this.$message.error('亲,你木有登录哦,先去登录吧')
    //   // 不存在就去跳去登录页
    //   this.$router.push("/login");
    // }
  },

  // 创建钩子
  created(){
    // **************(调整---权限模块 - 用户信息拉取前置, 用计算属性获取)************************
    // userInfo().then( res=>{
    //   // -------------- 移除token判断 (调整-路由白名单)-----------------
    //   // // 判断token
    //   // if(res.data.code === 0) {
    //   //   //token有问题  (伪造)
    //   //   this.$message.error("老弟,你牛逼呀,伪造token")
    //   //   // 删除token
    //   //   removeToken();
    //   //   // 去登录页面
    //   //   this.$router.push('/login');
    //   //   return
        
    //   // }

    //   // window.console.log(res);
    //   this.avatar =`${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`
    //   this.name = res.data.data.name
    //   // this.avatar = res.data.data.avatar
    // })

   
  },

   // (调整---权限模块 - 用户信息拉取前置, 用计算属性获取用户信息)
   computed: {
     getName(){
       return this.$store.state.userInfo.name;
     },
    //  获取头像
    getIcon(){
      return process.env.VUE_APP_BASEURL+'/'+this.$store.state.userInfo.avatar 
    },
    // 获取当前的用户的角色 
    getRole() {
      return this.$store.state.userInfo.role;
    }
   }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    // background-color: orange;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 23px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .aside {
    // background: skyblue;
  }
  .main {
    background-color: #e8e9ec;
  }

  // 折叠菜单相关的类名
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>
