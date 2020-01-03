import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Adal from "vue-adal";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles

Vue.use(Vuesax, {});
Vue.use(Adal, {
  config: {
    tenant: process.env.VUE_APP_TENANT_ID,
    clientId: process.env.VUE_APP_CLIENT_ID,
    redirectUri: process.env.VUE_APP_REDIRECT_URI,
    cacheLocation: "localStorage"
  },
  requireAuthOnInitialize: false,
  router: router
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
