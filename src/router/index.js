import Login from '../components/login/login';
import Home from '../components/home/home.vue';

// import commontHeader from '../components/home/content/commontHeader.vue'
import index from '../components/home/content/index/index.vue'
import realTime from '../components/home/content/realTime/realTime.vue'
import actualSys from '../components/home/content/actualSys/actualSys.vue'
import optionSys from '../components/home/content/optionSys/optionSys.vue'
import evtSelect from '../components/home/content/evtSelect/evtSelect.vue'
import AlarmTabulate from '../components/home/content/AlarmTabulate/AlarmTabulate.vue'
import TimedTask from '../components/home/content/TimedTask/TimedTask.vue'
import EquipLink from '../components/home/content/EquipLink/EquipLink.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/realTime',
        name: 'realTime',
        component: realTime
      },
      {
        path: '/actualSys',
        name: 'actualSys',
        component: actualSys
      },
      {
        path: '/optionSys',
        name: 'optionSys',
        component: optionSys
      },
      {
        path: '/evtSelect',
        name: 'evtSelect',
        component: evtSelect
      },
      {
        path: '/AlarmTabulate',
        name: 'AlarmTabulate',
        component: AlarmTabulate
      },
      {
        path: '/TimedTask',
        name: 'TimedTask',
        component: TimedTask
      },
      {
        path: '/EquipLink',
        name: 'EquipLink',
        component: EquipLink
      },
    ]
  }
];
