import Info from './components/Info.vue'
import Admin from './components/Admin.vue'
import Reg from './components/Reg.vue'
import Test from './components/Test.vue'
import Result from './components/Result.vue'

export const routes = [
  { path: '', name: 'info', component: Info },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/reg', name: 'reg', component: Reg },
  { path: '/test', name: 'test', component: Test, beforeEnter: beforeTest },
  { path: '/result', name: 'result', component: Result },
  { path: '*', name: 'all', redirect: {name: 'info'} }
];

function beforeTest(to, from, next) {
  if (from.name == 'reg') next();
  else next({name: 'info'});
}
