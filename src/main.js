import Vue from 'vue'
import App from './App.vue'
import router from './router'
// css初始化文件
import './styles/index.less'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 赋值给Vue的原型属性
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

Vue.use(ElementUI) // vue.ues（）注册整个的所有elemengUI组件
// use 调用了elementUI的一个方法  install    源码里面
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
