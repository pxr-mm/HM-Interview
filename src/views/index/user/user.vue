<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="more-width">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="more-width">
          <el-select v-model="formInline.role" placeholder="请选择状态">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <span type="text" v-if="scope.row.status === 0" style="color:red">禁用</span>
            <span type="text" v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 要想插入自己想要的东西,就使用插槽template-->
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="statusChange(scope.row)"
            >{{scope.row.status ===0 ?'启用': '禁用'}}</el-button>
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

    <!-- 新增用户对话框 -->
    <el-dialog title="新增用户" :visible.sync="addFormVisible" class="add-dialog">
      <el-form :model="addForm" ref="addForm" status-icon :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 角色 -->
        <el-form-item label="角色" prop="role" class="more-width" :label-width="formLabelWidth">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="教师" value="教师"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框的 状态 -->
        <el-form-item label="状态" prop="status" class="more-width" :label-width="formLabelWidth">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" class="add-dialog">
      <el-form :model="editForm" ref="editForm" status-icon :rules="addRules">

        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="action"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="editForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 角色 -->
        <el-form-item label="角色" prop="role" class="more-width" :label-width="formLabelWidth">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框的 状态 -->
        <el-form-item label="状态" prop="status" class="more-width" :label-width="formLabelWidth">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="origin" class="more-width" :label-width="formLabelWidth">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="前台" value="前台"></el-option>
            <el-option label="后台" value="后台"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitEdit">确 定</el-button>
        <el-button @click="resetForm('editForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入api抽取层 接口调用
import { user } from "../../../api/api";
export default {
  name: "name",
  data() {
    // 表单验证规则(自定义规则, 回调函数)
    // 邮箱
    const checkEmail = (rules, value, callback) => {
      if (!value) {
        // 如果输入值为空
        callback(new Error("老铁,邮箱不能为空哦"));
      } else {
        // 输入值不为空 正则表达式验证邮箱
        const email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 可以加个定时器验证显示  增加用户体验感(看需求)
        // setTimeout(() => {
        if (email.test(value)) {
          // 符合
          callback();
        } else {
          // 不符合
          callback(new Error("老铁,邮箱格式没有写对哦!"));
        }
        // }, 800);
      }
    };
    // 手机
    const checkPhone = (rules, value, callback) => {
      if (!value) {
        // 如果输入值为空
        callback(new Error("老铁,手机号不能为空哦"));
      } else {
        // 输入值不为空 正则表达式验证邮箱
        const res = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        // 可以加个定时器验证显示  增加用户体验感(看需求)
        // setTimeout(() => {
        if (res.test(value)) {
          // 符合
          callback();
        } else {
          // 不符合
          callback(new Error("老铁,手机格式没有写对哦!"));
        }
        // }, 800);
      }
    };
    return {
      // 筛选的表格
      formInline: {},
      // 列表数据  相当于v-for,自动帮你渲染页面
      tableData: [],

      // 分页相关
      // 当前页
      page: 1,
      // 页码数组
      pageSizes: [5, 10, 15, 20],
      // 页容量
      limit: 10,
      // 总页数
      total: 0,

      // 是否显示对话框(新增)
      addFormVisible: false,
      // 是否显示对话框(编辑)
      editFormVisible: false,

      // 新增数据表单
      addForm: {},
      // 编辑表单
      editForm: {},
      formLabelWidth: "80px",
      // 表单验证规则步骤2
      addRules: {
        // 要验证的元素的prop属性 注意:设置prop属性值时要和后台传参名一致
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [
          { required: true, trigger: ["blur", "change"], validator: checkEmail } //使用自定义校验规则,写在data中,checkEmail是一个回调函数
        ],
        phone: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: checkPhone //使用自定义校验规则
          }
        ],
        role: [{ required: true, message: "角色不能为空", trigger: "blur" }],
        status: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      },


      // 头像 
      imageUrl:'',
    };
  },

  // 页面一打开 生命周期钩子获取用户列表数据
  created() {
    // 调用接口 用户列表
    user.list().then(res => {
      // window.console.log(res);
      // 赋值给表单 渲染页面
      this.tableData = res.data.data.items;
      // 保存总条数
      this.total = res.data.data.pagination.total;
    });
  },

  // 方法
  methods: {
    // 获取数据逻辑
    getList() {
      // 调用接口 传递筛选条件(需要传的参数 name email role page  limit)
      user
        .list({
          page: this.page,
          limit: this.limit,
          // name: this.name //????  要表单元素一个一个的传?  no 这样写代码多麻烦
          // 可以利用element-UI  :model="formInline"属性传  formInline可以获取表单内的左右表单元素  有prop的属性的
          ...this.formInline //""..." 是ES6扩展运算符 相当于遍历这个数组并依次赋值
          // 注意 :  后台需要的参数 前端传过去只能多不能少
        })
        .then(res => {
          // window.console.log(res);
          // 赋值给表单 table
          this.tableData = res.data.data.items;
          // 重新设置容量
          this.total = res.data.data.pagination.total;
        });
    },

    // 分页处理
    // 页容量改变 (element-UI)
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

    // 搜索 筛选
    search() {
      // 跳到第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
    },

    // 重置新增表单内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新增用户方法
    submitAdd(addForm) {
      // 先进行表单验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 验证成功
          // 调用接口
          user.add(this.addForm).then(res => {
            window.console.log(res);
            // 如果成功  提示用户新增成功  关闭对话框  重新获取数据
            if (res.data.code == 200) {
              this.addFormVisible = false;
              this.$message.success("新增成功!");
              // 重新获取数据
              this.$refs[addForm].resetFields();
              this.getList();
            } else {
              // 失败
              // this.$message.warning("新增失败");
              this.$message.warning(res.data.message);
            }
          });
        } else {
          // this.$message.error("验证失败");
          return false;
        }
      });
    },

    // 禁用启用状态修改
    statusChange(data) {
      user.status({ id: data.id }).then(res => {
        if (res.data.code === 200) {
          this.getList();
        }
      });
    },
    // 点击编辑按钮
    showEdit(data) {
      // 显示编辑对话框
      this.editFormVisible = true;
      // 获取要编辑的数据的id ,,由scope.row传递过来
      // 浅拷贝
      // this.editForm = data;

      // 注意: 坑------------------------------------------
      // 此时,即使你修改了没有点击确定按钮,而是点击取消按钮,内容也变了,要刷新页面才显示原来的数据
      // 这叫数据联动, 数据是对象类型的,会改变地址
      // 方案:  为了不联动,  改为深拷贝
      this.editForm = JSON.parse(JSON.stringify(data));
    },

    // 编辑提交
    SubmitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 成功  调用接口
          user.edit(this.editForm).then(res => {
            // 成功 : 提示 关闭对话框  重新获取数据
            window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("修改成功");
              this.editFormVisible = false;
              this.getList();
            }
          });
        } else {
          // 失败 
          this.$message.warning("数据修改错误");
          return false
        }
      });
    }
  }
};
</script>

<style lang="less">
.user-container {
  // 新增框样式 (如果有很多这样的对话框样式差不多,可以抽取到全局base.css中去)
  .el-dialog {
    width: 477px;
    // height: 555px;
  }
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
