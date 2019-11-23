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
        <img class="avatar" src="../../assets/icon.gif" alt="" />
        <span class="name">西兰花,您好</span>
        <el-button class="logout" size="mini" type="primary">退出</el-button>
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
      <!-- 主体区域 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false
    };
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
