import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: {
      tests: [],
      userData: {}, //{name, group}
      resultData: [] //[{result, id}, {...}]
    }
  },
  getters: {  //getters
    getStoreData(state) {
      return state.data;
    },
    getTests(state) {
      return state.data.tests;
    }
  },
  mutations: {   //commit
    storeSaveUser(state, payload) {
      state.data.userData = payload;
    },
    storeSaveResult(state, payload) {
      state.data.resultData = payload;
    },
    setTests(state, payload) {
      payload.forEach(el => {
        state.data.tests.push(el);
      })
    }
  },
  actions: {  //dispatch
    storeSaveUser({commit}, {userData}) {
      commit('storeSaveUser', userData);
    },
    storeSaveResult({commit}, {resultData}) {
      commit('storeSaveResult', resultData);
    },
    loadTests({commit}) {
      axios.get(`http://localhost:3000/database/tests?qua=${20}`)
      .then((response) => {
        commit('setTests', response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
});
