<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="loginForm" status-icon label-width="80px">
          <h3>注册</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
        <el-form-item prop="accountType" label="账户类型">
         <el-select v-model="loginForm.accountType" placeholder="请选择账号类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>

</script>
<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      loginForm: {
        username: '',
        accountType: '',
        password: ''
      },
      options: [{
        value: '0',
        label: 'miner'
      }, {
        value: '1',
        label: 'worker'
      }]
    }
  },
  created () {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    doRegister () {
      if (!this.loginForm.username) {
        this.$message.error('请输入用户名！')
      } else if (!this.loginForm.accountType) {
        this.$message.error('请选择账户类型！')
      } else if (this.loginForm.accountType != null) {
        if (!this.loginForm.password) {
          this.$message.error('请输入密码！')
        } else {
          // this.$router.push({ path: '/register' }) // 无需向后台提交数据，方便前台调试
          this.$axios
            .post('/register', {
              username: this.loginForm.username,
              accountType: this.loginForm.accountType,
              password: this.loginForm.password
            })
            .then(res => {
              // console.log("输出response.data", res.data);
              // console.log("输出response.data.status", res.data.status);
              if (res.data.code === 200) {
                console.log(res.data)
                this.$router.push({ path: '/' })
                alert('恭喜，您已经注册成功')
              } else {
                console.log(res.data)
                alert(res.data.msg)
              }
            })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/img/login.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  border-radius: 15px;
  background-clip: padding-box;
  background-size: cover;
  width: 360px;
  height: 300px;
  margin: 215px auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
  position: relative;
  bottom: 20px;
}

h3 {
  color: #1d1e1fb8;
  font-size: 24px;
  position: relative;
  right: -120px;
}
hr {
  background-color: #444;
  margin: 20px auto;
  position: relative;
  bottom: 0px;
}

.el-button {
  width: 80%;
  margin-left: -50px;
  position: relative;
  left: 45px;
  bottom: -10px;
}
</style>
