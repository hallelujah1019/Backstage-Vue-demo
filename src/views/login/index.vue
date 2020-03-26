<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/elementui.png" alt />
        Welcome
      </div>
      <!-- 表单  :model表单的数据对象 :rules表单验证规则对象-->
      <el-form style="margin-top:30px" ref="ruleForm" :model="loginForm" :rules="loginRules">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入你的手机号" maxlength="11" ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input style="width:280px" v-model="loginForm.code" placeholder="请输入验证码" maxlength="6"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 勾选框 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 验证的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选协议
      },
      // 校验规则
      loginRules: {
        // key(要验证的规则)：[ {} ]
        mobile: [
          { required: true, message: '请输入你的手机号' },
          { type: 'string', message: '手机号必须为字符串' },
          { pattern: /^1[345789]\d{9}$/, message: '请输入139111111111' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码' },
          { pattern: /246810/, message: '验证码为246810' }
        ],
        checked: [
          {
            // 自定义验证函数validator
            validator: function (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('你需要勾选用协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate(isOK => {
        if (isOK) {
          // 调用接口token  登录主页
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          })
            .then(result => {
              // 获取用户token 存入本地
              const token = result.data.data.token
              window.localStorage.setItem('user_token', token)
              // elementui正确提示
              this.$message({ message: '登录成功', type: 'success' })
              // 跳转到主页/home
              this.$router.push('/home')
            })
            .catch(() => {
              // elementui错误提示
              this.$message.error('手机号或者验证码错误')
            })
        }
      })
    }
  }
}
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
