import Vue from 'vue'
import App from '@app/App.vue'
import router from '@app/router'
import store from "@app/store"

// Import bulma
import "bulma/css/bulma.min.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

