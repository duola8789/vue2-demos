// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';

import filters from '@/components/helper/filters'
// import './mock'

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$eventBus = Vue.prototype.$eventBus ||  new Vue();

// 一旦使用全局混入对象，将会影响到 所有之后创建的 Vue 实例。
Vue.mixin({
  created() {
    // console.log('全局mixin')
  }
});

// 全局过滤器
// 可以单独提到一个文件中进行使用
// Vue.filter('capitalize1st', value => {
//   return value.charAt(0).slice(0, 1).toUpperCase() + value.slice(1)
// });

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
  data: {
	  eventBus: new Vue()
  },
	router,
	store,
	components: {App},
	template: '<App/>'
});

