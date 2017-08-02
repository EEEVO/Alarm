const Login = resolve => require(['../components/login/login'], resolve)
const Home = resolve => require(['../components/home/home.vue'], resolve)
const index = resolve => require(['../components/home/content/index/index.vue'], resolve)
const realTime = resolve => require(['../components/home/content/realTime/realTime.vue'], resolve)
const actualSys = resolve => require(['../components/home/content/actualSys/actualSys.vue'], resolve)
const optionSys = resolve => require(['../components/home/content/optionSys/optionSys.vue'], resolve)
const evtSelect = resolve => require(['../components/home/content/evtSelect/evtSelect.vue'], resolve)
const AlarmTabulate = resolve => require(['../components/home/content/AlarmTabulate/AlarmTabulate.vue'], resolve)
const TimedTask = resolve => require(['../components/home/content/TimedTask/TimedTask.vue'], resolve)
const EquipLink = resolve => require(['../components/home/content/EquipLink/EquipLink.vue'], resolve)

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
  },
];
