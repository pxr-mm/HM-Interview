<template>
<<<<<<< HEAD
  <el-container class="index-box">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
=======
  <!-- <div class="index">  -->
  <el-container class="index">
    <el-header class="header">
      <!-- 头部左侧 -->
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse = !isCollapse" :class="{ rotate: isCollapse}"></i>
        <img class="logo" src="../../assets/index.logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <!-- 头部右侧 -->
      <div class="right">
        <img src="../../assets/icon.gif" alt class="icon" />
        <span class="userName">摆渡人,您好</span>
        <el-button class="logout" size="mini" type="primary">退出</el-button>
      </div>
    </el-header>

  
    <!-- 页面左侧导航栏 -->
    <el-container>
       <!-- style="width:auto" 让宽度自适应 被内容撑开 -->
      <el-aside style="width:auto" class="aside">
        <!-- 注意点:  加上router 才可以在页面上点击菜单到切换子页面  isCollapse是点击菜单图标是否折叠-->
        <el-menu default-active="5" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="Datashow">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="itemslist">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 页面主体部分 -->
      <el-main class="main">
        <!-- 嵌套组件的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
>>>>>>> index
</template>

<script>
export default {
<<<<<<< HEAD
  name: "index"
};
</script>

<style lang="less">
.index-box {
    background-color: #ffe;
    height: 100%;

    .header {
        background-color: #fff;
    }
    .main {
        background-color: #E8E9EC;
    }
=======
  name: "index",
  data() {
    return {
      // 菜单是否折叠 
      isCollapse: false
    };
  }
};
</script>

<style lang=less>
.index {
  height: 100%;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
     .el-icon-s-fold {
        font-size: 23px;
        margin-right: 22px;
      }
      img.logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span.title {
        font-size: 22px;
        color: #49a1ff;
      }
    }

    .right {
      display: flex;
      align-items: center;
      .icon {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .userName {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  /* 左侧导航栏 */
  .aside {
    
  }
  .main {
    background-color: #e8e9ec;
  }

  /* 折叠菜单相关类名 */
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
>>>>>>> index
}
</style>