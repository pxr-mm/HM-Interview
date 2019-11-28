<template>
  <div class="userlist-container">
    <!-- 头部 -->
    <el-card class="header-car">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="big-width" prop="email">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formInline.role" placeholder="请选择角色">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetForm('formInline')">清空</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible=true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 内容 -->
    <!-- 表格 -->
    <el-card class="main-table">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号" width="80"></el-table-column>

        <el-table-column prop="name" label="用户名"></el-table-column>

        <el-table-column prop="phone" label="电话"></el-table-column>

        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>

        <el-table-column label=" 操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">{{ scope.row.status===1?'禁用':'启用' }}</el-button>
            <el-button @click="remove(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
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

    <!-- 新增框 -->
    <el-dialog title="新增用户" :visible.sync="addFormVisible" class="add-dialog">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 所属领域 -->
        <el-form-item label="角色" class="more-width" :label-width="formLabelWidth" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择状态">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" class="more-width" :label-width="formLabelWidth" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="1" value="1"></el-option>
            <el-option label="0" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重 置</el-button>
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 所属领域 -->
        <el-form-item label="角色" class="more-width" :label-width="formLabelWidth" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择状态">
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" class="more-width" :label-width="formLabelWidth" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 

<script>
//导入接口
import { user } from "../../../api/api.js";
//计时器
// var num = 1;
// setInterval(() => {
//   user.remove({
//     id: num
//   });
//   num++;
// }, 1000);


//循环删除
// for (var i = 0; i < 10; i++) {
//   user.remove({
//     id: i
//   });
// }

//循环添加
// for (var i = 500; i < 1000; i++) {
//   enterprise.add({
//     eid: i,
//     name: '大黄',
//     short_name: '阿黄',
//     intro: '嘻哈',
//     remark: 'ok',
//     tag:'互联网'
//   });
// }

export default {
  name: "userlist",
  data() {
    // 定义校验的规则
    const checkPhone = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        // 格式验证
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 对的
          callback();
        } else {
          // 错误
          callback(new Error("手机号格式不对哦"));
        }
      }
    };
    return {
      tableData: [],
      formInline: {},
      //新增表单数据
      addForm: {
        name: "",
        email: "",
        phone: "",
        role: "",
        status: ""
      },
      editForm: {},
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // 页码数组
      pageSizes: [5, 10, 15, 20],
      // 总条数
      total: 0,
      // 新增表单是否显示
      addFormVisible: false,
      // 编辑表单是否显示
      editFormVisible: false,
      formLabelWidth: "80px",
      // 表单验证规则
      addRules: {
        name: [
          { required: true, message: "用户名不能为空哦", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: ["blur", "change"] }
        ]
      }
    };
  },

  created() {
    user
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        // 保存 总条数
        this.total = res.data.data.pagination.total;
      });
  },

  methods: {
    getList() {
      //调用接口
      user
        .list({
          page: this.page,
          limit: this.limit,
          ...this.formInline
        })
        .then(res => {
          // window.console.log(res);
          //把数据复制给table
          this.tableData = res.data.data.items;
          //总条数
          this.total = res.data.data.pagination.total;
        });
    },

    //清除重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 筛选逻辑
    search() {
      // 跳转到第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },

    // 页容量改变
    handleSizeChange(size) {
      // 保存起来
      this.limit = size;
      // 修改页码
      // 去第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
    },
    // 页码改变
    handleCurrentChange(current) {
      // 保存页码
      this.page = current;
      // 重新获取数据
      this.getList();
    },

    // 提交新增表单
    submitAdd(addForm) {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 成功
          // 调用接口
          user.add(this.addForm).then(res => {
            // window.console.log(res);
            // 如果成功 提示用户 关闭 对话框
            if (res.data.code == 200) {
              this.addFormVisible = false;
              this.$message.success("新增成功");
              this.$refs[addForm].resetFields();
              // 重新获取一次
              this.getList();
            }
          });
        } else {
          // 失败
          this.$message.warning("老铁，数据不太对哦");
          return false;
        }
      });
    },

    //编辑按钮
    submitEdit() {
      // 编辑表单
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 成功
          this.$delete(this.editForm,'create_time')
          // 调用接口
          user.edit(this.editForm).then(res => {
            // window.console.log(res);
            // 如果成功 提示用户 关闭 对话框
            if (res.data.code == 200) {
              this.editFormVisible = false;
              this.$message.success("编辑成功");
              // 重新获取一次
              this.getList();
            }
          });
        } else {
          // 失败
          this.$message.warning("老铁，数据不太对哦");
          return false;
        }
      });
    },

    // 启用禁用数据的方法
    status(data) {
      user
        .status({
          id: data.id,
          // 三元表单时
          status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          // window.console.log(res)
          if (res.data.code === 200) {
            this.getList();
            // this.$message.success(res.data.message);
          }
        });
    },

    //点击编辑按钮
    showEdit(data) {
      this.editFormVisible = true;

      // document.documentElement.style.position = "fixed";
      // document.body.style.overflow = "hidden"; //隐藏滚动条

      this.editForm = JSON.parse(JSON.stringify(data));
    },

    // 删除数据的方法
    // remove(data) {
    //   // window.console.log(data);
    //   this.$confirm("此操作将永久删除该学科, 确定?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       // 接口调用
    //       user
    //         .remove({
    //           id: data.id
    //         })
    //         .then(res => {
    //           // window.console.log(res);
    //           if (res.data.code == 200) {
    //             // 提示
    //             this.$message.success("删除成功");
    //             // 重新获取数据
    //             this.getList();
    //           }
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }
  }
};
</script>


<style lang="less">
.userlist-container {
  .header-car {
    .el-input__inner {
      width: 100px;
    }
    .big-width {
      .el-input__inner {
        width: 150px;
      }
    }
    .el-form-item .index-containe {
      text-align: left;
    }
  }

  //表格
  .main-table {
    margin-top: 20px;
  }

  .el-dialog {
    width: 477px;
    .el-dialog__header {
      background-color: aqua;
      text-align: center;
    }
    .el-dialog__title {
      color: white;
    }
    .el-input__inner {
      width: 100%;
    }
    .dialog-footer {
      text-align: center;
    }
  }

  .el-dialog .el-form-item__content {
    text-align: left;
  }
}
</style>
