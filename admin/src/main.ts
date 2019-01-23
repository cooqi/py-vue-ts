import Vue from 'vue'
import App from './App.vue'
import {router,routerGo} from './router'
import store from './store'
import { Button ,message,Layout,Menu,Icon,Input ,Table,Tag,Divider,Modal ,DatePicker,Switch,Select} from 'ant-design-vue'
import api from './fetch/api';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Modal)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Select)

Vue.prototype.$message = message
Vue.prototype.$api    = api;
Vue.prototype.$routeGo    = routerGo;
Vue.prototype.$modal = Modal


import * as filters from './filter/index';
//循环遍历所有过滤器
const F = filters as any
Object.keys(filters).forEach(key => {
    Vue.filter(key, F[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
