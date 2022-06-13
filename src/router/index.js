// import { register } from 'echarts/lib/CoordinateSystem';
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const blockchain = r => require.ensure([], () => r(require('@/page/blockchain')), 'blockchain');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const blockHeader = r => require.ensure([], () => r(require('@/page/blockHeader')), 'blockHeader');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const ownTask = r => require.ensure([], () => r(require('@/page/ownTask')), 'ownTask');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const nodeList = r => require.ensure([], () => r(require('@/page/nodeList')), 'nodeList');
const addNodes = r => require.ensure([], () => r(require('@/page/addNodes')), 'addNodes');
const viewTask = r => require.ensure([], () => r(require('@/page/viewTask')), 'viewTask');
const issueTask = r => require.ensure([], () => r(require('@/page/issueTask')), 'issueTask');
const submitTask = r => require.ensure([], () => r(require('@/page/submitTask')), 'submitTask');
const taskDetail = r => require.ensure([], () => r(require('@/page/taskDetail')), 'taskDetail');
const routes = [
	{
		path: '/',
		component: login,
		name: 'login',
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/register',
		component: register
	},
	{
		path: '/manage',
		component: manage,
		name: 'manage',
		meta: {
			requireAuth: true
		  },
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addShop',
			component: addShop,
			meta: ['添加数据', '添加商铺'],
		},




		{
			path: '/nodeList',
			component: nodeList,
			
			meta: {
				requireAuth: true
			},
		},{
			path: '/addNodes',
			component: addNodes,
			meta: [{
				requireAuth: true
			},],
		},
		{
			path: '/ownTask',
			component: ownTask,
			meta: [{
				requireAuth: true
			},],
		},
		{
			path: '/taskDetail',
			component: taskDetail,
			meta: [{
				requireAuth: true
			},],
		},
		{
			path: '/viewTask',
			component: viewTask,
			meta: {
				requireAuth: true
			},
		},{
			path: '/applyTask',
			
			meta: [{
				requireAuth: true
			},],
		},
		{
			path: '/issueTask',
			component: issueTask,
			
			meta: {
				requireAuth: true
			},
		},{
			path: '/submitTask',
			component: submitTask,
			name: submitTask,
			meta: [{
				requireAuth: true
			},],
		},
		
		{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/blockchain',
			component: blockchain,
			meta: ['数据管理', '区块链'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/blockHeader',
			component: blockHeader,
			meta: ['数据管理', '区块链头信息'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明'],
		}]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
