import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import Main from './Main.vue';
import { routes, secureRoute } from './routes';
import { store } from './store/store.js'

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Main)
});
