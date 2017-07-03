import Login from '../components/login/login';
import Home from '../components/home/home.vue';

import commontHeader from '../components/home/content/commontHeader.vue'

export default[
  {
    path : '/login',
    component : Login
  }, {
    path : '/home',
    component : Home
  }, {
    path : '/commontHeader',
    component : commontHeader
  }
];
