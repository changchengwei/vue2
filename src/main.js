import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import Fragment from'vue-fragment'
Vue.use(Fragment.Plugin)

import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)

// // import '@/axios/index'
import axios from 'axios'
Vue.prototype.$axios = axios

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// 1. 引入你需要的组件
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
Vue.use(Vant);

import less from 'less'
Vue.use(less);
import store from './store/index.js'

import './uits/directive.js'
import warterMark from "./uits/warterMark.js"



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  mounted() {
    warterMark.set("水印测试")
  },
}).$mount('#app')
