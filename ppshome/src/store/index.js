import Vue from "vue";
import Vuex from "vuex";
// import { getGithubInfoAPI } from '@/api'
// import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qqPart: {
      content: {},
      infoList: [],
    },
    biliPart: {
      content: {},
      infoList: [],
    },
    githubPart: {
      content: {},
      infoList: [],
    },
  },
  getters: {
    qqPart: (state) => state.qqPart,
    biliPart: (state) => state.biliPart,
    githubPart: (state) => state.githubPart,
  },
  mutations: {
    updateQq(state, val = {}) {
      state.qqPart.infoList = val.infoList || "";
      state.qqPart.content = val.content || "";
    },
    updateBili(state, val = {}) {
      state.biliPart.infoList = val.infoList || "";
      state.biliPart.content = val.content || "";
    },
    updateGithub(state, val = {}) {
      state.githubPart.infoList = val.infoList || "";
      state.githubPart.content = val.content || "";
    },
  },
  actions: {},
});
