/*
 * @Author: zhanghaoran 
 * @Date: 2017-06-29 11:29:24 
 * @Last Modified by: zhanghaoran
 * @Last Modified time: 2017-06-29 17:32:17
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
      try {
        if (window.localStorage.userName != "" && window.localStorage.userName != null) {
          this.$router.push('/index');
        } else {
          this.$router.push('/login');
        }
      } catch (ex) {
        this.$router.push('/login');
      }
    }
  }
});
