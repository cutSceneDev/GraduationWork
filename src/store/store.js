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
  getters: {
    getStoreData(state) {
      return state.data;
    }
  },
  mutations: {
    saveStoreData(state, data) {
      if (data.userData) {
        state.data.userData = data.userData;
      }
      if (data.resultData) {
        state.data.resultData = data.resultData;
      }
    }
  }
});
