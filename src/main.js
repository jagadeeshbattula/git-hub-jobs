// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ToggleButton } from 'vue-js-toggle-button'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ToggleButton', ToggleButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
