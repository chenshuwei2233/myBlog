import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//user界面
const userList = () => import('../views/users/userList')
const createUser = () => import('../views/users/createUser')
const editUser = () => import('../views/users/editUser')

//blog界面
const blogList = () => import('../views/blog/blogList')
const createBlog = () => import('../views/blog/createBlog')
const blogDetail = () => import ('../views/blog/blogDetail')
const editBlog = () => import('../views/blog/editBlog')

//预览图界面
const preViewList = () => import('../views/preview/preViewList')
const editPreView = () => import('../views/preview/editPreView')

//login界面
const login = () => import('../views/login/Login')

//分类界面
const sortList = () => import('../views/sort/sortList')
const createSort = () => import('../views/sort/createSort')

 const routes = [
		{
			path: '/',
			redirect: '/login',
			component: login
		},
		{
			path: '/users/list',
			component: userList
		},
		{
			path: '/users/create',
			component: createUser
		},
		{
			path: '/users/edit/:id',
			component: editUser
		},
		{
			path: '/login',
			component: login
		},
		{
			path: '/blogs/list',
			component: blogList 
		},
		{
			path: '/blogs/create',
			component: createBlog
		},
		{
			path: '/blogs/detail/:id',
			component: blogDetail
		},
		{
			path: '/blogs/edit/:id',
			component: editBlog
		},
		
		{
			path: '/sort/list',
			component: sortList
		},
		{
			path: '/sort/create',
			component: createSort
		},
		{
			path: '/preview/list',
			component: preViewList
		},
		{
			path: '/preview/edit/:id/:rotation',
			component: editPreView
		}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

//导航守卫
//使用router.beforeEach注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
	if(to.path === '/login') {
		next();
	} else {
		let token = localStorage.getItem('authorization')
		if(token === 'null' || token === '') {
			next('/login')
		} else {
			next();
		}
	}
})
export default router
