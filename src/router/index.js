/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import NotFound from '@/components/NotFound';

import Demo14Child1 from '@/components/demos/demo14/demo14-1';
import Demo14Child2 from '@/components/demos/demo14/demo14-2';
import Demo14Child3 from '@/components/demos/demo14/demo14-3';

import Demo38Child1 from '@/components/demos/demo38/demo38-1';
import Demo38Child2 from '@/components/demos/demo38/demo38-2';

/**
 * 路由自动注册
 */
const requireComponent = require.context('@/components/demos', true, /demo[0-9][0-9]?\.vue$/);
const routes = requireComponent.keys().map((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 剥去文件名开头的 `./` 和结尾的扩展名
  const componentName = fileName.replace(/^\.\/(demo[0-9][0-9]?).*\.\w+$/, '$1');

  // 全局注册组件
  const component = Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );

  return {
    path: `/${componentName}`,
    // name: componentName,
    component
  };
});

routes.unshift({
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld,
  beforeEnter(to, from, next) {
    // console.log('beforeEnter');
    next();
  }
});

routes.unshift({
  path: '/test/:id',
  name: 'test',
  component: HelloWorld,
  beforeEnter(to, from, next) {
    // console.log('beforeEnter');
    next();
  }
});

routes.push({
  path: '*',
  name: 'NotFound',
  component: NotFound
});

routes.find((v) => v.path === '/demo38').children = [
  {path: '/', redirect: {name: '382'}},
  {path: 'demo38-1/:id', name: '381', component: Demo38Child1, props: true},
  {path: 'demo38-2', name: '382', component: Demo38Child2, props: true}
];

routes.find((v) => v.path === '/demo14').children = [
  {path: '/', redirect: 'Child1'},
  {path: 'Child1', component: Demo14Child1},
  {path: 'Child2', component: Demo14Child2},
  {path: 'Child3', component: Demo14Child3}
];

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  },
  base: '/test'
});

router.beforeEach((to, from, next) => {
  // console.log('beforeEach');
  next();
});

router.beforeResolve((to, from, next) => {
  // console.log('beforeResolve');
  next();
});

router.afterEach((to, from) => {
  // console.log('afterEach');
});

export default router;
