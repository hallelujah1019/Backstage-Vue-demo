import Vue from 'vue'
import App from './App.vue'
import router from './router'
// css初始化文件
import './styles/index.less'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
