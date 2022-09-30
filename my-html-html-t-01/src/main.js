import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import store from './store'
import axios from './utils/http';
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
Vue.config.productionTip = false
// 注册全局方法
Vue.prototype.$api = ({
  url, method, ...others 
 }, query) => {
   if (method === 'get') {
     return axios.get(url, query, others);
   }
   if (method === 'put') {
     return axios.put(url, query, others);
   }
   return axios.post(url, query, others);
 };
//应用插件
Vue.use(VueRouter)
new Vue({
  el:'#app',
  render: h => h(App),
  store,
  router:router
})
