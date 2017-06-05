import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes, secureRoute } from './routes'
import Main from './components/Main.vue'
import Store from './store'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(secureRoute);

new Vue({
  el: '#app',
  axios,
  Store,
  router,
  render: h => h(Main)
})
