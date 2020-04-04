import Vue from 'vue'
import VueRouter from 'vue-router'
// 布局 一级路由
import Layout from '../views/layout'
import Login from '../views/login'
// 首页、发布文章、内容列表
import Home from '@/views/home'
import Publish from '@/views/publish'
import Article from '@/views/article'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/',
    name: 'layout',
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

export default router
