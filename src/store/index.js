/**
 * Created by zh on 2018/3/14.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import todoList from './modules/todo-list.js'
import demo16 from './modules/demo16.js'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		store_todoList: todoList,
		store_demo16: demo16
	}
})
