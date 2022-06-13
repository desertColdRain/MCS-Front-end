import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);
var axios = require('axios')
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
axios.defaults.baseURL = 'http://localhost:8088/'
axios.defaults.withCredentials = true
//var cors = require('cors')

router.beforeEach((to, from, next) => {
	store.commit('getToken')
	const token = store.state.user.token
	//console.log(token)
	// 没有token并且需要登录的页面，直接返回登录页面 
	//alert(to.components)
	if(!token && to.path!=='/'&&to.path!=='/register'){
		alert('进行了重定向')
		next({ name: '/'})
	}
	else {
		//alert('不需要进行重定向')
		next()
	}
	})
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

//app.use(cors()) // Use this after the variable declaration
