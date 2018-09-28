import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const requireComponent  = require.context('../components/demos', true, /demo[1-9][0-9]?\.vue$/);
const routes = requireComponent.keys().map(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 剥去文件名开头的 `./` 和结尾的扩展名
  const componentName = fileName.replace(/^\.\/(demo[1-9][0-9]?).*\.\w+$/, '$1');

  // 全局注册组件
  const component = Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );

  return {
    path: `/${componentName}` ,
    name: componentName,
    component,
  }
});

routes.unshift({
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld
});

Vue.use(Router);

export default new Router({
  routes,
})
