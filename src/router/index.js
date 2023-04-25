// import { register } from 'echarts/lib/CoordinateSystem';
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const blockchain = r => require.ensure([], () => r(require('@/page/blockchain')), 'blockchain');

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
const blockDetail = r => require.ensure([], () => r(require('@/page/blockDetail')), 'blockDetail');

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
		},
		{
			path: '/nodeList',
			component: nodeList,
			
			meta: ['节点管理', '节点列表'],
		},{
			path: '/addNodes',
			component: addNodes,
			meta: ['节点管理', '添加节点'],
		},
		
		{
			path: '/ownTask',
			component: ownTask,
			meta: ['任务管理', '区块查看自己发布任务链'],
		},
		{
			path: '/taskDetail',
			component: taskDetail,
			meta: ['任务管理', '区块链任务详细信息'],
		},
		{
			path: '/viewTask',
			component: viewTask,
			meta: ['任务管理', '查看任务'],
		},{
			path: '/applyTask',
			
			meta: ['任务管理', '申请任务'],
		},
		{
			path: '/issueTask',
			component: issueTask,
			
			meta: ['任务管理', '发布任务'],
		},{
			path: '/submitTask',
			component: submitTask,
			name: submitTask,
			meta: ['任务管理', '提交任务'],
		},
		
		{
			path: '/blockchain',
			component: blockchain,
			meta: ['数据管理', '区块链'],
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
		},
		{
			path: '/blockDetail',
			component: blockDetail,
			meta: ['信息浏览', '区块详细信息'],
		},
		{
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
