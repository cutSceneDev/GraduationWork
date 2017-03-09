import Vue from 'vue'
import Store from './store'
import Main from './components/Main.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  Store,
  router: new VueRouter({
    mode: 'history',
    routes
  }),
  render: h => h(Main)
})
