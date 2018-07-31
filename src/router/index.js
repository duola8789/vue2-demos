import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import demo1 from '@/components/demos/demo1';
import demo2 from '@/components/demos/demo2';
import demo3 from '@/components/demos/demo3';
import demo4 from '@/components/demos/demo4';
import demo5 from '@/components/demos/demo5';
import demo6 from '@/components/demos/demo6';
import demo7 from '@/components/demos/demo7';
import demo8 from '@/components/demos/demo8';
import demo9 from '@/components/demos/demo9/demo9';
import demo10 from '@/components/demos/demo10/demo10';
import demo11 from '@/components/demos/demo11';
import demo12 from '@/components/demos/demo12';
import demo13 from '@/components/demos/demo13';
import demo14 from '@/components/demos/demo14/demo14';
import demo15 from '@/components/demos/demo15/demo15';
import demo16 from '@/components/demos/demo16';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
			path: '/demo1',
			name: 'demo1',
			component: demo1
		}, {
			path: '/demo2',
			name: 'demo2',
			component: demo2
		}, {
			path: '/demo3',
			name: 'demo3',
			component: demo3
		}, {
			path: '/demo4',
			name: 'demo4',
			component: demo4
		}, {
			path: '/demo5',
			name: 'demo5',
			component: demo5
		}, {
			path: '/demo6',
			name: 'demo6',
			component: demo6
		},
		{
			path: '/demo7',
			name: 'demo7',
			component: demo7
		}, {
			path: '/demo8',
			name: 'demo8',
			component: demo8
		}, {
			path: '/demo9',
			name: 'demo9',
			component: demo9
		}, {
      path: '/demo10',
      name: 'demo10',
      component: demo10
    }, {
      path: '/demo11',
      name: 'demo11',
      component: demo11
    }, {
      path: '/demo12',
      name: 'demo12',
      component: demo12
    }, {
      path: '/demo13',
      name: 'demo13',
      component: demo13
    }, {
      path: '/demo14',
      name: 'demo14',
      component: demo14
    }, {
      path: '/demo15',
      name: 'demo15',
      component: demo15
    }, {
      path: '/demo16',
      name: 'demo16',
      component: demo16
    }
  ]
})
