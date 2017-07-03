import Login from '../components/login/login';
import Home from '../components/home/home.vue';

// import commontHeader from '../components/home/content/commontHeader.vue'
import index from '../components/home/content/index.vue'
import realTime from '../components/home/content/realTime.vue'
import actualSys from '../components/home/content/actualSys.vue'
import optionSys from '../components/home/content/optionSys.vue'
import evtSelect from '../components/home/content/evtSelect.vue'
import AlarmTabulate from '../components/home/content/AlarmTabulate.vue'
import TimedTask from '../components/home/content/TimedTask.vue'
import EquipLink from '../components/home/content/EquipLink.vue'

export default[
  {
    path : '/login',
    name:'Login',
    component : Login
  }, {
    path : '/home',
    name:'Home',
    component : Home,
    children : [
      {
        path: '/index',
        name:'index',
        component: index
      },
      {
        path: '/realTime',
        name:'realTime',
        component: realTime
      },
      {
        path: '/actualSys',
        name:'actualSys',
        component: actualSys
      },
      {
        path: '/optionSys',
        name:'optionSys',
        component: optionSys
      },
      {
        path: '/evtSelect',
        name:'evtSelect',
        component: evtSelect
      },
      {
        path: '/AlarmTabulate',
        name:'AlarmTabulate',
        component: AlarmTabulate
      },
      {
        path: '/TimedTask',
        name:'TimedTask',
        component: TimedTask
      },
      {
        path: '/EquipLink',
        name:'EquipLink',
        component: EquipLink
      },
    ]
  }
];
