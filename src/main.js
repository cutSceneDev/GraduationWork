import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Main from './components/Main.vue'
import Store from './store'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.use(axios)
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  axios,
  Store,
  router,
  render: h => h(Main)
})

//let weather;
// axios.get('http://localhost:3000/database/testing')
//   .then(function (response) {
//     weather = response;
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//
//   axios.post('http://localhost:3000/database/testing', {
//     id: "('how old are u?','12','16','21','54','3')",
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
