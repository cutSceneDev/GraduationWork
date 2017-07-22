import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: {
      userData: {}, //{name, group}
      resultData: [] //[{result, id}, {...}]
    }
  },
  getters: {  //getters
    getStoreData(state) {
      return state.data;
    }
  },
  mutations: {   //commit
    storeSaveUser(state, payload) {
      state.data.userData = payload;
    },
    storeSaveResult(state, payload) {
      state.data.resultData = payload;
    }
  },
  actions: {  //dispatch
    storeSaveUser({commit}, {userData}) {
      commit('storeSaveUser', userData);
    },
    storeSaveResult({commit}, {resultData}) {
      commit('storeSaveResult', resultData);
    }
  }
});
