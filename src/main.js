import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";

// import "./registerServiceWorker";
import axios from "axios";

import router from "./router";

import i18n from "./i18n";

Vue.config.productionTip = false;

let httpClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "http://api.lakejason0.ml/api/" : "/api"
});
httpClient.interceptors.request.use(config => {
  let token = localStorage.getItem("treehole-token");
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});
Vue.prototype.$http = httpClient;

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
});

// eslint-disable-line
let vm = new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");

console.log(vm);
