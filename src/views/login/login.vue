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
      <el-input
        placeholder="请输入手机号"
        class="phone-input"
        prefix-icon="el-icon-user"
        v-model="input1"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        class="password-input"
        prefix-icon="el-icon-lock"
        v-model="input2"
      ></el-input>

      <!-- element-UI栅格布局 -->
      <!-- 验证码 -->
      <el-row class="captcha-row">
        <el-col :span="16">
          <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input3"></el-input>
        </el-col>
        <el-col :span="8">
          <img class="captcha" src="../../assets/captcha.png" alt />
        </el-col>
      </el-row>

      <!-- 我已阅读协议 -->
      <el-checkbox class="checkbox">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>

      <!-- 按钮 -->
      <el-button type="primary" class="login-btn">登录</el-button>
      <el-button type="primary" class="reg-btn">注册</el-button>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="banner" />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: ""
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
    .login-btn,
    .reg-btn
     {
       width: 100%;
       margin-top: 27px;
      //  element组件按钮默认兄弟之间有间隔,清除间隔
      margin-left: 0;
     }
  }
}
</style>
