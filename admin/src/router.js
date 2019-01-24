import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import ('@/views/login');
const Home = () => import ('@/views/Home');
const Works = () => import ('@/views/work/work-list');
const WorksAdd = () => import ('@/views/work/work-add');
const WorksEdit = () => import ('@/views/work/work-edit');
const Tag = () => import ('@/views/tag/tag');
const Self = () => import ('@/views/self/self-info');

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
        },{
            path: '/worksEdit',
            name: 'worksEdit',
            component: WorksEdit,
            meta: { title: '编辑作品',key:'1' },
        },{
            path: '/tag',
            name: 'tag',
            component: Tag,
            meta: { title: '标签管理',key:'3' },
        },{
            path: '/self',
            name: 'self',
            component: Self,
            meta: { title: '个人信息',key:'2' },
        }
        ],
        redirect: '/works'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    next();

});

let routerGo = function(path, params, isquery) {
    if (isquery) {
        router.push({ path: path, query: params ? params : {} }); //$routerGo('/index',{}，true)  url、带参数
    } else {
        router.push({ name: path, params: params ? params : {} }); //$routerGo('/index',{})  url不带参数
    }
};

export {
    router,
    routerGo
};