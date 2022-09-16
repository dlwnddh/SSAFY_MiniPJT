import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chartData: {},
  },
  mutations: {
    CHANGE_CHART_DATA(state, data) {
      state.chartData = data;
    },
  },
});
