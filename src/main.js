import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

// import "./registerServiceWorker";
import axios from "axios";

import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: "/api"
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
