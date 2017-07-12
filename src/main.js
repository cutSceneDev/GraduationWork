import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Store from './store'
import VueRouter from 'vue-router'
import { routes, secureRoute } from './routes'
import Main from './components/Main.vue'

Vue.use(VueAxios, axios)
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(secureRoute);

new Vue({
  el: '#app',
  router,
  render: h => h(Main)
})
