import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import demo1 from '@/components/demos/demo1';
import demo2 from '@/components/demos/demo2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
		{
			path: '/demo1',
			name: 'demo1',
			component: demo1
		},
		{
			path: '/demo2',
			name: 'demo2',
			component: demo2
		}
  ]
})
