/*
 * @Author: zhanghaoran 
 * @Date: 2017-06-29 11:29:24 
 * @Last Modified by: 张浩然
 * @Last Modified time: 2017-06-30 20:47:29
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'


import App from './App';
import routes from './router/index';
import {
  state,
  mutations
} from './vuex/vuex';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
// Vue.user(Axios)

const router = new VueRouter({
  routes
});

const store = new Vuex.Store({
  state,
  mutations
})

const vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 家里测试写组件
      this.$router.push('/home');
      // TODO:代码可用
      // try {
      //   if (window.localStorage.userName != "" && window.localStorage.userName != null && window.localStorage.LOGIN_COMPLETE === "true") {
      //     this.$router.push('/home');
      //   } else {
      //     this.$router.push('/login');
      //   }
      // } catch (ex) {
      //   this.$router.push('/login');
      // }
    }
  }
});
