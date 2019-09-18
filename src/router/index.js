/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

// 懒加载工厂函数
const lazyLoad = path => {
  if (process.env.NODE_ENV === 'development') {
    const comp = require(`@/pages/${path}.vue`);
    return comp.default || comp
  }
  return () => import(/* webpackChunkName: "view-[request]-[index]" */ `@/pages/${path}.vue`);
};

const routes = [
  {path: '/', name: 'home', component: lazyLoad('Home'), alias: '/home'},
  {path: '/user', name: 'user', component: lazyLoad('User')},
  {path: '/about', name: 'about', component: lazyLoad('About')},
  {path: '*', name: 'notFound', component: lazyLoad('NotFound')},
];

Vue.use(Router);

export default new Router({
  routes,
});
