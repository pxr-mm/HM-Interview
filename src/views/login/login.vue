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
        <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
        <el-button type="primary" class="reg-btn"  @click="showReg = true">注册</el-button>
      </el-form>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="banner" />
  </div>
</template>

<script>
import axios from 'axios';
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
      // 是否勾选
      checked: true,

      //  验证表单步骤4. 登录验证规则
      loginRules: {
        phone: [
          {
            // 设置表单验证规则中 通过validator设置一个验证的函数
            validator: checkPhone
          }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码的 强度不够" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码只有4位哦" }
        ]
      },

      // 验证码地址
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login"
    };
  },

  // 方法:
  methods: {
    // 设置点击验证码刷新(有两种方法)
    changeCaptcha() {
      // 方法1.修改值即可,在地址后面添加随机生成的参数
      // 很有可能重复
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Math.random()}`;
      // 2. 时间戳  绝对不会重复
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}}`;
      // this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login`
    },

    // 点击登录
    submitForm(formName) {
      // 布尔判断 如果为false
      // 选中协议提示
      if (!this.checked) {
        this.$message.warning("未勾选用户协议, 必须勾选!");
        return;
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功
          // alert("提交成功!");
          // 接口调用

          // 密码输入 可以运用加密加盐技术

          axios({
            url: "http://183.237.67.218:3002/login",
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },

            // ajax 跨域请求时，默认不会携带cookie，导致验证码无法验证
            // 为了携带cookie,设置下面一句代码即可
            withCredentials: true,
          }).then(res => {
            //成功回调
            // window.console.log(res);
            if(res.data.code === 200){
              // 成功
              this.$message.success('主人你可算回来啦');
            } else{
              // 失败
              this.$message.warning('账号或密码错误');
            }
          });
        } else {
          // 验证失败
          window.console.log('error submit !!');
          return false;
        }
      });
    }
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
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-top: 27px;
      //  element组件按钮默认兄弟之间有间隔,清除间隔
      margin-left: 0;
    }
  }
}
</style>
