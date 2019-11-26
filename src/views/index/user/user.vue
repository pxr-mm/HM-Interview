<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="more-width">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="more-width">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="教师" value="教师"></el-option>
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
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 要想插入自己想要的东西,就使用插槽template-->
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">禁用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
   <el-card></el-card>

  </div>
</template>

<script>
// 导入api抽取层 接口调用
import { user } from '../../../api/api';
export default {
  name: "name",
  data() {
    return {
      // 筛选的表格 
      formInline: {},
      // 列表数据  相当于v-for,自动帮你渲染页面
      tableData: [],

      // 当前页 
      page: 1,
      // 页码数组
      pageSizes:[5, 10, 15, 20],
      // 页容量
      limit: 10,
      // 总页数 
      total: 0
    };
  },
  methods: {
    
  },
  // 页面一打开 生命周期钩子获取用户列表数据
  created(){
    // 调用接口 用户列表
   
    user.list().then(res => {
       window.console.log(res)
      this.tableData = res.data.data.items;
    });
    
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
