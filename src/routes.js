import Intro from './components/Intro.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'
import Test from './components/Test.vue'
import Result from './components/Result.vue'

export { routes, secureRoute };

const routes = [
  { path: '', name: 'main', component: Intro },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/login', name: 'login', component: Login },
  { path: '/test', name: 'test', component: Test },
  { path: '/result', name: 'result', component: Result },
  { path: '*', name: 'all', redirect: '/' }
];

const secureRoute = function(to, from, next) {
  let access = true;
  if (from.name == 'test') {
    access = false;
  }
  if (to.name == 'test' && from.name != 'login') {
    access = {name: 'all'};
  }
  if (from.name == 'test' && to.params.access) {
    access = true;
  }
  //console.log(from, ' => ', to, ' // ', access);
  next(access);
}
