// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
// import './mock'

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$eventBus = Vue.prototype.$eventBus ||  new Vue();

// 一旦使用全局混入对象，将会影响到 所有 之后创建的 Vue 实例。
Vue.mixin({
  created() {
    // console.log('全局mixin')
  }
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
});

