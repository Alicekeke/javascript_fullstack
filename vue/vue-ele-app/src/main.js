// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueRouter from 'vue-router'
import './common/stylus/index.styl'

// Vue.use(axios)
Vue.prototype.$http = axios
// import './common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
