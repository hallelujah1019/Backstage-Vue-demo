import Vue from 'vue'
import App from './App.vue'
import router from './router'
// css初始化文件
import './styles/index.less'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入页面导航进度条样式文件
import 'nprogress/nprogress.css'
// 引入axios
import axios from 'axios'
// 超出安全整数范围
import JSONbig from 'json-bigint'
// 时间格式
import moment from 'moment'
// 赋值给Vue的原型属性
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// ------------------------------------------------------------------
// 超出安全整数范围转换
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  // 任何接口都会返回数据
  // 所有请求返回的数据都要 JSONbig.parse(data) 转一下
  // 删除操作，后端返回的是空数据
  // 空数据一经转换就报错了
  // 说白了，当没有响应体的时候，JSONbig.parse(data) 执行就报错了

  // 把导致出错的代码放到 try 里面，把出错之后的处理放到 catch 里面
  // try-catch 是 JavaScript 的原生语法，就像 if-else 一样，专门用于捕获异常
  try {
    return JSONbig.parse(data)
  } catch (err) {
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }

  // console.log(data)
  // return JSONbig.parse(data)
}]

// axios 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对 config 进行统一配置定制
  // console.log('请求拦截器', config)

  // 获取本地存储中的 token
  const token = window.localStorage.getItem('user_token')

  // 统一添加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // return config 是通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 全局过滤器：任何组件模板都可以直接访问
// 参数1：过滤器名称
// 参数2：函数
// 调用方式：在模板中 {{ 数据 | 过滤器 }}
// | 管道符前面的数据就会作为参数传递给过滤器函数
// 过滤器函数的第1个参数始终是
// value、format 是形参，它就是我随便起的一个名字
// Vue 在1.x 的时候有很多内置的过滤器
// Vue 升级版本 2 的时候移除了所有的内置过滤器
// 但是保留了过滤器的功能
// 用户还可以继续自定义添加过滤器来使用
// 强调：处理一些简单的文本格式化
Vue.filter('dateFormat', (value, format = 'YYYY-Mo-Do HH:mm:ss') => {
  return moment(value).format(format)
})

Vue.use(ElementUI) // vue.ues（）注册整个的所有elemengUI组件
// use 调用了elementUI的一个方法  install    源码里面
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
