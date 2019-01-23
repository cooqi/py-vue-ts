import Vue from 'vue'
import Router from 'vue-router'

const login = () => import ('@/views/login.vue');
const Home = () => import ('@/views/Home.vue');
const Works= () => import ('@/views/work/my-works.vue');
const WorksAdd= () => import ('@/views/work/my-works-add.vue');

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
        children: [{
            path: '/works',
            name: 'works',
            component: Works,
            meta: { title: '我的作品',key:'1' },
        },{
            path: '/worksAdd',
            name: 'worksAdd',
            component: WorksAdd,
            meta: { title: '添加作品',key:'1' },
        }
        ],
        redirect: '/works'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    }
  ]
})


router.beforeEach((to, from, next) => {
    //没有登录就进入登录页面

    let istoken = localStorage.getItem("token");
    if (!istoken && to.path !== '/login') {
        routerGo('login');
    }
    /*Loading.service();*/

    next()

});



let routerGo = function(path: string, params={}, isquery=false) {
    if (isquery) {
        router.push({ path: path, query: params }); //$routerGo('/index',{}，true)  url、带参数
    } else {
        router.push({ name: path, params: params }); //$routerGo('/index',{})  url不带参数
    }
};

export {
    router,
    routerGo
};
