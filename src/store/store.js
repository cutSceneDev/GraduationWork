import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: {
      userData: {

      },
      questData: {

      }
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
      if (data.questData) {
        state.data.questData = data.questData;
      }
    }
  }
});
