import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Adal from 'vue-adal'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax, {})
Vue.use(Adal, {
    config: {
      tenant: 'd8ac9062-da58-40c7-87f3-2ddea9fa470f',
      clientId: 'a6e7c431-4570-4135-a3ba-bbf92b146833',
      redirectUri: 'http://localhost:8080/',
      cacheLocation: 'localStorage'
    },
    requireAuthOnInitialize: false,
    router: router
  });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
