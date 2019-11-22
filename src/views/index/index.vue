<template>
  <el-container class="index-box">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
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
}
</style>