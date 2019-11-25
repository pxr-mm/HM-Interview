<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="date" label="企业标号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="address" label="简称"> </el-table-column>
        <el-table-column prop="skill" label="创建者"> </el-table-column>
        <el-table-column prop="skill" label="创建日期"> </el-table-column>
        <el-table-column label="状态"> </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template>
            <el-button type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="36"
      >
      </el-pagination>
    </el-card>
   <el-card></el-card>

  </div>
</template>

<script>
export default {
  name: "enterprise",
  data() {
    return {
      formInline: {},
      tableData: []
    };
  }
};
</script>

<style lang="less">
.enterprise-container {
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }

  // 分页器的样式
  .el-pagination{
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card{
    margin-top: 20px;
  }
}
</style>
