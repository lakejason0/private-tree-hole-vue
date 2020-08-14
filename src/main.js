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
Vue.prototype.$http = axios.create({
  baseURL: "/api"
});

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

// eslint-disable-line
let vm = new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");

console.log(vm);
