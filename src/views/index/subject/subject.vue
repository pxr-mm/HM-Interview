<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- prop需要数据关联 -->
        <el-table-column prop="rid" label="学科标号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <!-- ................ -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <el-card></el-card>
  </div>
</template>


<script>
import { subject } from "../../../api/api.js";
export default {
  name: "enterprise",
  data() {
    return {
      // 数据关联 表单,默认是一个空对象, 在我们操作对应数据是.会自动增加这个属性
      formInline: {},
      tableData: [], //数据关联  渲染表格数据(根据后台传的数据自动生成表格列表数据,相当于v-for渲染列表指令)
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // 页码数组
      pageSizes: [5, 10, 15, 20],
      // 总条数
      total: 0
    };
  },

  created() {
    // 接口调用
    subject
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        // window.console.log(res);
        // 表格数据
        this.tableData = res.data.data.items;
        // 页码数据
        this.total = res.data.data.pagination.total;
      });
  },

  // 方法
  methods: {
    // 获取表格数据列表
    getList() {
      // 调用接口 传筛选条件
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          window.console.log(res);
          // 表格数据
          this.tableData = res.data.data.items;
          // 保存 总条数数据
          this.total = res.data.data.pagination.total;
        });
    },

    // 筛选逻辑  点击搜索
    search() {
      // 跳转到第一页
      this.page = 1;
      //  获取相应的数据
      this.getList();
    },
    // 页容量改变
    handleSizeChange(size) {
      // 存起来
      this.limit = size;
      // 修改页码
      // 跳转第一页
      this.page = 1;
      // 重新获取数据
      this.search();
    },
    // 页码改变
    handleCurrentChange(current) {
      // 保存页码
      this.page = current;
      // 重新获取数据
      this.search();
    }
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
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card {
    margin-top: 20px;
  }
}
</style>
