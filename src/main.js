import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { filesize, datetime } from "@/filters";
import em from "./events";

Vue.config.productionTip = false;

// handle errors
window.onerror = event => {
  console.log(event);
  em.emit("error", event.toString());
};
// handle rejected promises
window.addEventListener("unhandledrejection", function(event) {
  em.emit("error", event.reason.toString());
});

// add global filters
Vue.filter("filesize", filesize);
Vue.filter("datetime", datetime);

// create vue instance
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
