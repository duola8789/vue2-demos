/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

import '@/style/reset.css';
import '@/assets/icons/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/filter';
import '@/plugin';
import '@/directives';

// import './mock'

Vue.config.productionTip = false;
Vue.prototype.$eventBus = Vue.prototype.$eventBus || new Vue();

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
