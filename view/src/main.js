import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import api from './api'
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
Vue.prototype.$api=api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
