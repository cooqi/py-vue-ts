import Vue from 'vue'
import Router from 'vue-router'
const Home= () => import('./views/Home.vue')
const Content= () => import('./views/content.vue')
const XHR= () => import('./views/xiaohuangren.vue')
const Works= () => import('./views/works.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home,
      },
    {
      path: '/content',
      name: 'content',
      component: Content,
        children:[
            {
                path: '/xhr',
                name: 'xhr',
                component: XHR
            },
            {
                path: '/works',
                name: 'works',
                component: Works
            }
        ],
        redirect: '/works'
    }
  ]
})
