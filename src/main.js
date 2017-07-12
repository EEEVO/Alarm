/*
 * @Author: zhanghaoran
 * @Date: 2017-06-29 11:29:24
 * @Last Modified by: 张浩然
 * @Last Modified time: 2017-07-12 22:03:22
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import Axios from 'axios'

import App from './App';
import routes from './router/index';
import {state, mutations} from './vuex/vuex';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({routes});

const store = new Vuex.Store({state, mutations})

const vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  // watch: {   "$route": 'checkLogin' },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 家里测试写组件
      this
        .$router
        .push('/index');
      // TODO:代码可用
      /* try {
        if (window.localStorage.userName != "" && window.localStorage.userName != null && window.localStorage.LOGIN_COMPLETE === "true") {
          this.$router.push('/index');
        } else {
          this.$router.push('/login');
        }
      } catch (ex) {
        this.$router.push('/login');
      } */
    }
  }
});
