import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import { filesize, datetime } from "@/filters";

Vue.config.productionTip = false;

Vue.filter("filesize", filesize);
Vue.filter("datetime", datetime);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
