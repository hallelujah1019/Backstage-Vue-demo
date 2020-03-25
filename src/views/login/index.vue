<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/elementui.png" alt />
        Welcome
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:30px" ref="form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input style="width:280px"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 勾选框 -->
        <el-form-item style="margin: -10px 0 10px 0">
          <el-checkbox>我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.login {
  background-image: url(../../assets/img/timg.jpg);
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card {
    width: 440px;
    height: 360px;
    .title {
      font-size: 38px;
      font-weight: 600;
      color: #409eff;
      margin-top: 10px;
      text-align: center;
      img {
        vertical-align: top;
        margin-top: 5px;
      }
    }
  }
}
</style>
