import Vue from 'vue'
import VueRouter from 'vue-router'
// 布局 一级路由
import Layout from '../views/layout'
import Login from '../views/login'
// 导航进度条
import NProgress from 'nprogress'
// 首页、发布文章、内容列表、评论管理、素材管理、账户信息
import Home from '@/views/home'
import Publish from '@/views/publish'
import Article from '@/views/article'
import Comment from '@/views/comment'
import CommentDetail from '@/views/comment-detail'
import Media from '@/views/media'
import Account from '@/views/account'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '',
    component: Layout,
    // 子路由
    children: [{
      path: '/',
      component: Home
    },
    // 发布文章
    {
      path: '/publish',
      component: Publish
    },
    // 内容列表
    {
      path: '/article',
      component: Article
    },
    // 编辑页面
    //    如果从 a 路由跳转到 b 路由
    //    两个，如果两个路由使用的同一个组件，那么这个组件不会重新渲染
    //    正常的路由跳转，会销毁离开的组件，渲染新匹配到的组件
    //    组件销毁也就意味着它的数据之类都被清除了
    {
      path: '/publish/:articleId',
      component: Publish
    },
    // 评论管理
    {
      path: '/comment',
      component: Comment
    },
    // 评论列表
    {
      path: '/comment/:articleId',
      component: CommentDetail,
      props: true
    },
    // 素材管理
    {
      path: '/media',
      component: Media
    },
    // 账户信息
    {
      path: '/account',
      component: Account
    }
    ]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

// 路由守卫(拦截器) beforeEach（全局前置守卫） 方法 ,该方法接受一个函数作为参数
//  参数1 to，表示去哪里的路由信息
// 参数2 from，表示来自哪里的路由信息
// 参数3 next，他是一个方法，用于路由方行
// ------------- 判断用户登录状态，有就通过，没有就跳转到登录页 ------------
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 如果访问的事登录页，直接方行
  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是登录页面 获取token
  const token = window.localStorage.getItem('user_token')
  if (token) {
    next()
  } else {
    next('/login')
    // 如果在登录页并且是非登录状态访问非登录页，这里要手动的终止进度条，否则进度条不会停止
    NProgress.done()
  }
})
/**
 * afterEach 路由导航结束后触发的勾子函数
 */
router.afterEach((to, from) => {
  // 结束进度条
  NProgress.done()
})

export default router
