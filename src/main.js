import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import r from '@/router/router'
import cookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$userDetails = {
  username: null,
  userID: null,
  accessToken: null,
  refreshToken: null
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(cookies)

new Vue({
  el: "#app",
  router: r,
  render: h => h(App)
})
