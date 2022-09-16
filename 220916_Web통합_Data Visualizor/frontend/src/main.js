import Vue from "vue";
import App from "./App.vue";
//import router from "./router";
import store from "./store";
// BootstrapVue 임포트
// bootstrap.css, bootstrap-vue.css 도 함께 가져와야한다.
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Vue 에서 전역으로, BootstrapVue 사용
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
