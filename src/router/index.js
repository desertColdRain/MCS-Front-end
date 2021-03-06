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
			meta: ['????????????', '????????????'],
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
			meta: ['????????????', '????????????'],
		},{
			path: '/blockchain',
			component: blockchain,
			meta: ['????????????', '?????????'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['????????????', '????????????'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['????????????', '????????????'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['????????????', '????????????'],
		},{
			path: '/blockHeader',
			component: blockHeader,
			meta: ['????????????', '??????????????????'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['??????', '????????????'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['??????', '????????????'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['????????????', 'MarkDown'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['??????', '???????????????'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['??????', '????????????'],
		},{
			path: '/explain',
			component: explain,
			meta: ['??????'],
		}]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
