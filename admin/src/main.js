import Vue from 'vue'
import App from './App.vue'
import {router,routerGo} from './router';
import api from './fetch/api';
import config from './config/base';
import store from './store'
import './iview'


Vue.config.productionTip = false

Vue.prototype.$routeGo    = routerGo;
Vue.prototype.$api    = api;
Vue.prototype.$config    = config;

import * as filters from './filter/index.js';
//循环遍历所有过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
