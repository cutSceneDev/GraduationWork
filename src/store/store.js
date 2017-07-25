import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    testing: {
      user: {
        name: '',
        group: ''
      },
      questions: [], //[{}]
      result: [] //[{result, id}, {...}]
    }
  },
  getters: {  //getters
    getStoreData(state) {
      return state.testing;
    },
    getStoreTests(state) {
      return state.testing.questions
    }
  },
  mutations: {   //commit
    storeSaveUser(state, payload) {
      state.testing.user = payload;
    },
    storeSaveResult(state, payload) {
      state.testing.result = payload;
    },
    storeSaveTest(state, payload) {
      payload.forEach((test) => {
        state.testing.questions.push(test);
      })
    }
  },
  actions: {  //dispatch
    storeSaveUser({commit}, {user}) {
      commit('storeSaveUser', user);
    },
    storeSaveResult({commit}, {result}) {
      commit('storeSaveResult', result);
    },
    storeGetTest({commit}) {
      axios.get(`http://localhost:3000/database/tests?qua=20`)
      .then((response) => {
        commit('storeSaveTest', response.data);
      })
      .catch((error) => {
        throw error;
      })
    },
    storeClearTest() {

    }
  }
});
