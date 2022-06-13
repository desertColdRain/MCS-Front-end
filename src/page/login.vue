<template>
  <body id="login-page">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">移动众包系统登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
        <router-link to="/register">注册账号</router-link>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;  border: none"
          @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import { mapState, Store } from 'vuex'

//为模块指定默认输出
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },

  mounted(){
		
		},
  computed: {
   
  },



  
  methods: {







    login () {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          //token: successResponse.data.token
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            alert('恭喜，您已成功登录')
            //console.log(successResponse.data.data.token)
            // 存储用户相关信息
            console.log('后台获取密码 为：'+successResponse.data.data.password)
            this.$store.commit('setToken',successResponse.data.data.token)
            console.log("123")
            this.$store.commit('setUsername',successResponse.data.data.username)
           this.$store.commit('setAddress',successResponse.data.data.address)
            this.$store.commit('setPubKey',successResponse.data.data.pubKey)
            
            
            console.log("456")
        
            this.$router.replace({path: '/manage'})
          } else {
            alert('您输入的用户名和密码不正确！')
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
#login-page {
  background: url("../assets/img/login.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: relative;
  top: 110px;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
