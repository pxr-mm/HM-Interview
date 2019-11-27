<template>
  <div class="login-container">
    <!-- 左侧 form -->
    <div class="form-wrapper">
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>

      <!-- 表单 -->
      <!-- 验证表单步骤1 : 用el-form把所有表单元素包起来
      -->
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <!-- 验证表单步骤2 :每个要验证的元素外部用el-form-item
        * 设置prop-->

        <!-- 手机号 -->
        <el-form-item label prop="phone">
          <el-input
            placeholder="请输入手机号"
            class="phone-input"
            prefix-icon="el-icon-user"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>

        <el-form-item label prop="password">
          <!-- 密码 -->
          <el-input
            placeholder="请输入密码"
            class="password-input"
            type="password"
            maxlength="12"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <!-- element-UI栅格布局 -->
        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.captcha"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" @click="changeCaptcha" :src="captchaSrc" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 我已阅读协议 -->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>

        <!-- 登录注册按钮 -->
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm('loginForm')"
          @keyup.enter="submitForm('loginForm')"
        >登录</el-button>
        <el-button type="primary" class="reg-btn" @click="showReg = true">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="banner" />

    <!-- 注册对话框  点击注册按钮, 显示注册表单 :visible.sync="showReg"-->

    <el-dialog title="用户注册" class="reg-dialog" :visible.sync="showReg">
      <!--表单 -->
      <el-form :model="registerForm" :rules="registerules" ref="ruleForm" status-icon>
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

        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" type="password" :label-width="formLabelWidth" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="captcha" :src="regCaptcha" @click="changeRegCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <!-- 获取手机验证码 -->
              <el-button @click="getMessage" type="primary" :disabled="isDisabled">{{ btnTxt }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showReg = false">取消</el-button>
        <el-button type="primary" @click="registerUser('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入路由
// import axios from "axios";
// 已经全部抽取为方法了，不再需要axios
import { login, register, sendsms } from "../../api/api.js";
// 导入抽取的token方法
import { setToken } from "../../utils/token.js";

export default {
  name: "login",
  data() {
    // 验证表单步骤: 定义校验规则(自定义校验规则-手机号部分)
    const checkPhone = (rules, value, callback) => {
      //value是值
      if (!value) {
        callback(new Error("手机号不能空"));
      } else {
        // 格式验证
        const res = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (res.test(value)) {
          // 对的
          callback();
        } else {
          callback(new Error("手机号格式不对"));
        }
      }
    };

    return {
      // 验证表单步骤3.  在data中定义登录表单数据
      loginForm: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        captcha: ""
      },
      // 是否勾选协议
      checked: true,

      //  验证登录表单步骤4. 登录验证规则
      loginRules: {
        phone: [
          {
            required: true,
            trigger: ["blur", "change"],
            // 设置表单验证规则中 通过validator设置一个验证的函数
            validator: checkPhone
          }
        ],
        password: [
          { required: true, message: "密码不能为空" }
          // { min: 8, message: "密码的 强度不够" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码只有4位哦" }
        ]
      },

      // 验证码地址
      captchaSrc: `${process.env.VUE_APP_BASEURL}/captcha?type=login`,

      // 注册表单部分
      // 是否显示注册框
      showReg: false,
      // 注册表单数据
      // 验证 注册表单步骤3
      registerForm: {
        name: "",
        phone: "",
        email: "",
        // 用户头像
        avatar: "",
        password: "",
        // 短信验证码
        rcode: "",
        // 图形验证码
        code: ""
      },

      // 验证注册表单步骤4: 定义规则
      registerules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 3 到 5 个字符",
            trigger: ["blur", "change"] //可以在鼠标离开时就检测
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],

        phone: [
          { required: true, validator: checkPhone, trigger: ["blur", "change"] }
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "密码强度不够" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度位4个字符",
            trigger: ["blur", "change"]
          }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度位4个字符",
            trigger: ["blur", "change"]
          }
        ]
      },

      // 表单距离左边框的距离
      formLabelWidth: "67px",
      // 图片地址
      imageUrl: "",

      // 注册图形验证码 地址
      regCaptcha: `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms`,

      // 获取手机验短信证码部分
      btnTxt: "获取用户验证码",
      // 1.按钮是否可以点击(设置按钮禁用启用)
      isDisabled: false,
      // 文件上传地址
      action: process.env.VUE_APP_BASEURL + "/uploads"
    };
  },

  // 方法:
  methods: {
    // 设置点击登录验证码刷新(有两种方法)
    changeCaptcha() {
      // 方法1.修改值即可,在地址后面添加随机生成的参数
      // 很有可能重复
      this.captchaSrc = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=login&${Math.random()}`;
      // 2. 时间戳  绝对不会重复
      this.captchaSrc = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=login&${Date.now()}}`;
      // this.captchaSrc = `${process.env.VUE_APP_BASEURL}/captcha?type=login`
    },

    // 点击登录
    submitForm(formName) {
      // window.console.log(process.env.VUE_APP_BASEURL);
      // 布尔判断 如果为false
      // 选中协议提示
      if (!this.checked) {
        this.$message.warning("未勾选用户协议, 必须勾选!");
        return;
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      // 饿了么的表单.validate() 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功
          // alert("提交成功!");
          // 接口调用
          // window.console.log()
          // window.console.log("加密:" + this.$md5(this.loginForm.password));
          this.loginForm.password = this.$md5(this.loginForm.password);

          // axios({
          //   url: `${process.env.VUE_APP_BASEURL}/login`,
          //   method: "post",
          //   data: {
          //     phone: this.loginForm.phone,
          //     password: this.$md5(this.loginForm.password),
          //     code: this.loginForm.captcha
          //   },

          //   // ajax 跨域请求时，默认不会携带cookie，导致验证码无法验证
          //   // 为了携带cookie,设置下面一句代码即可
          //   withCredentials: true
          // })
          login({
            phone: this.loginForm.phone,
            password: this.$md5(this.loginForm.password),
            code: this.loginForm.captcha
          }).then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code === 200) {
              // 成功
              this.$message.success("主人你可算回来啦");
              // 跳转
              this.$router.push("/index");

              // 保存token
              // window.localStorage.setItem("mmtoken",res.data.data.token)
              setToken(res.data.data.token);
            } else {
              // 失败
              this.$message.warning("账号或密码错误");
            }
          });
        } else {
          // 验证失败
          window.console.log("error submit !!");
          return false;
        }
      });
    },

    // 注册表单部分
    // 头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.success("上传头像图片只允许传 非JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
      // return isJPG;
    },

    // 注册图形验证码点击图片刷新(两种方法)
    changeRegCaptcha() {
      //1.  随机生成一个数
      // this.regCaptcha = `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&${Math.random()}`;
      // 2. 时间戳
      this.regCaptcha = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&${Date.now()}`;
    },

    // 获取手机短信验证码
    getMessage() {
      // 非空判断
      if (this.registerForm.phone.trim() == "") {
        this.$message.warning("哥们，你的手机号呢！滑稽");
        return;
      }
      // 格式判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        this.$message.warning("老铁,你的手机是不是写错了呀！");
        return;
      }
      // // 说明 格式 内容都有
      // axios({
      //   url: `${process.env.VUE_APP_BASEURL}/sendsms,
      //   method: "post",
      //   data: {
      //     code: this.registerForm.code,
      //     phone: this.registerForm.phone
      //   },
      //   // 跨域携带cookie
      //   withCredentials: true
      // })

      // api层方式发送axios
      sendsms({
        code: this.registerForm.code,
        phone: this.registerForm.phone
      })
        .then(res => {
          window.console.log(res);
        })
        .then(res => {
          window.console.log(res);
        });

      let time = 60;
      // 禁用按钮 开启定时器
      this.isDisabled = true;
      const interId = setInterval(() => {
        // 递减
        time--;
        // 修改页面
        this.btnTxt = `${time}S后再次获取`;
        if (time == 0) {
          clearInterval(interId);
          // 重新启用按钮
          this.isDisabled = false;
          // 还原文本
          this.btnTxt = "获取短信验证码";
        }
      }, 100);
    },

    //注册确认按钮事件
    registerUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //前台加密
          this.registerForm.password = this.$md5(this.registerForm.password);

          // axios({
          //   url: `${process.env.VUE_APP_BASEURL}/register`,
          //   method: "post",
          //   data: {
          //     avatar: this.registerForm.avatar,
          //     email: this.registerForm.email,
          //     name: this.registerForm.name,
          //     //后台加密
          //     password: this.$md5(this.registerForm.password),
          //     phone: this.registerForm.phone,
          //     rcode: this.registerForm.rcode
          //   }
          // })
          register({
            avatar: this.registerForm.avatar,
            email: this.registerForm.email,
            name: this.registerForm.name,
            // 注意:前台加密,传参入后台和登录时要同步加密
            password: this.$md5(this.registerForm.password),
            phone: this.registerForm.phone,
            rcode: this.registerForm.rcode
          }).then(res => {
            //成功回调
            if (res.data.code === 200) {
              // 成功
              this.$message.success("注册成功啦！");
              // window.console.log(this.registerForm.password);
            } else {
              // 失败
              this.$message.warning("注册失败了哦");
            }
          });
        } else {
          //验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    }
  },

  // 登录页面按下enter键触发登录方法 登录
  created() {
    let that = this;
    document.onkeydown = function(e) {
      e = window.event || e;
      if (
        that.$route.path == "/login" &&
        (e.code == "Enter" || e.code == "enter")
      ) {
        //验证在登录界面和按得键是回车键enter
        that.submitForm("loginForm"); //登录函数
      }
    };
  }
};
</script>

<style lang="less">
// 登录盒子
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平方向的对其方式 */
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .form-wrapper {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 48px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 26px;
        background-color: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
    }
    .phone-input {
      margin-top: 28px;
      margin-bottom: 25px;
    }
    .password-input {
      margin-bottom: 25px;
    }
    .captcha-row {
      .captcha {
        width: 100%;
        height: 42px;
      }
    }

    .checkbox {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 32px;
      // element-UI复选框 运行会自动生成这个标签
      // 控制复选框文字和框勾选框对齐
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }

    // 登录和注册按钮
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-top: 27px;
      //  element组件按钮默认兄弟之间有间隔,清除间隔
      margin-left: 0;
    }
  }

  // 对话框中的 样式
  .captcha {
    height: 41px;
    width: 100%;
  }
  // .captcha-btn {
  //   width: 100%;
  // }

  // 对话框
  .reg-dialog .el-dialog {
    width: 602px;
  }
  .reg-dialog {
    // 头部 饿了么自动生成的头部和尾部标签
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c5fa, #1394fa);
      .el-dialog__title {
        color: white;
      }
    }
    // 底部
    .dialog-footer {
      text-align: center;
    }
  }
}

// 头像组件样式
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.login-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
