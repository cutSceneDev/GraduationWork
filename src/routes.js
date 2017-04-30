import Intro from './components/Intro.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'
import Test from './components/Test.vue'
import Result from './components/Result.vue'

const routes = [
  { path: '', component: Intro },
  { path: '/admin', component: Admin,
    beforeEnter: (to, from, next) => {
      next(false);
    }
  },
  { path: '/login', component: Login },
  { path: '/test', component: Test,
      children: [
        { path: 'result', component: Result }
  ]},
  { path: '*', redirect: '/' }
];

export default routes;
