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

Vue.use(ElementUI) // vue.ues（）注册整个的所有elemengUI组件
// use 调用了elementUI的一个方法  install    源码里面
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
