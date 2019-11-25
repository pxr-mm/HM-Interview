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
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增学科</el-button>
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
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">
              <!-- 禁用启用按钮 -->
              {{ scope.row.status === 1?'禁用':'启用'}}
            </el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
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

    <!-- 新增对话框 -->
    <el-dialog title="新增学科" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="Rules">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addForm.intro" autocomplete="off" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 0,
      // 新增学科
      addFormVisible: false,
      // 新增表单
      addForm: {},
      // label的宽度不设置不能都在一行
      formLabelWidth: "100px",
      // 新增学科表单验证规则
      Rules: {
        rid: [ { required: true, message: "学科编号不能为空哦", trigger: "blur" }],
        name: [{ required: true, message: "学科名不能为空", trigger: "blur" }]
      }
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
    },
    // 提交新增学科表单
    submitAdd() {
      // 表单验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 验证成功
          // 调用接口
          subject.add(this.addForm).then(res => {
            window.console.log(res);
            // 如果成功  提示用户 关闭 对话框
            if(res.data.code == 200) {
              this.addFormVisible = false;
              this.$message.success(res.data.message);
              // 重新获取一次;
              this.getList();
            }
           
          });
        } else {
           // 如果失败  提示用户数据必选项要填完整
           this.$message.warning('老铁,必选项要填哦');
           return false;
        }
      });
    },
    // 删除数据方法
    remove(data){
      window.console.log(data);
      // 提示用户
      this.$confirm("此操作将永久删除学科,确定?","提示", {
        consfirmButtonText: "确定",
        cancelButtonText:"取消",
        type: "warning"
      })
      // 用户点击确定
      .then(()=>{
        // 调用接口
        subject.remove({
          id: data.id
        }).then( res=> {
          // 如果删除成功, 弹出框提示成功
          if( res.data.code === 200) {
            this.$message.success(res.data.message);
            // 重新获取数据列表
            this.getList();
          }
        })
      })
      // 用户点击取消
      .catch(()=>{
       this.$message({
            type: "info",
            message: "已取消删除"
          });
      })
    },

    // 启用禁用数据的方法
    status(data) {
      subject.status({
        id: data.id,
        // 三元表达式
        status: data.status === 1?0:1
      }).then(res => {
        // window.console.log(res);
        if(res.data.code === 200){
          // 重新获取列表是数据
          this.getList();
          this.$message.success(res.data.message)
        }
      })
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
  .red {
    color: red;
  }
}
</style>
