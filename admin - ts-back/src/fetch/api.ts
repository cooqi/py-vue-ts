import Vue from 'vue'
import axios from 'axios';
import store from '../store';
import {router,routerGo} from '../router';
import Qs from 'qs'

let base: string = "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        base = "http://192.168.0.85:9002"  //这里是本地的请求url
        break
    case 'production':
        base = "http://192.168.0.85:9002"   //生产环境url
        break
}
let instance=axios.create({
  baseURL: base,
  timeout: 10000,
  transformRequest: [function (data) {
    if(typeof data =='string'){
      return data
    }
    data = Qs.stringify(data);
    return data
  }]
})
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//todo 拦截器
instance.interceptors.request.use(function (config) {  //配置发送请求的信息
 // Loading.service();
 /* store.commit('IS_LOADING',true)*/
 /* if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${store.state.token}`;
  }*/

  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => {
   /* let loadingInstance = Loading.service();
    loadingInstance.close();*/
    /*store.commit('IS_LOADING',false);*/
    return response;
  },
  error => {
   /* store.commit('IS_LOADING',false);*/
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面

          localStorage.removeItem("token");
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });





function apiAxios (method, url, params, success, failure) {

 return instance({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params: {},
    params: method === 'GET' || method === 'DELETE' ? params : null,
   headers: method=='GET'?{
     'X-Requested-With': 'XMLHttpRequest',
     "Accept": "application/json",
     "Content-Type": "application/json; charset=UTF-8"
   }:{
     'X-Requested-With': 'XMLHttpRequest',
     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
   }
 })
    .then(function (res) {
      if (res.data.code == 401) {
       // alert('登录失效，请重新登录')
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        routerGo('login');

        return false
      } else {
        return res.data
      }
    },function (res) {
      //Message.error('访问异常，请重试')
      console.log(res)
    })
   /* .catch(function (err) {
      let res = err.response
      if (err) {
        alert('api error' )
        return
      }
    })*/
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

