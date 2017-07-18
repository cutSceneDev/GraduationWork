import Intro from './components/Intro.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'
import Test from './components/Test.vue'
import Result from './components/Result.vue'

export { routes };

const routes = [
  { path: '', name: 'main', component: Intro },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/login', name: 'login', component: Login },
  { path: '/test', name: 'test', component: Test, beforeEnter: beforeTest },
  { path: '/result', name: 'result', component: Result },
  { path: '*', name: 'all', redirect: {name: 'main'} }
];

function beforeTest(to, from, next) {
  if (from.name == 'login') next();
  else next({name: 'main'});
}
