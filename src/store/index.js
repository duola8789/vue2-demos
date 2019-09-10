/**
 * Created by zh on 2018/3/14.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import todoList from './modules/todo-list.js'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    title: 'Vuex',
  },
  modules: {
    store_todoList: todoList,
  }
})
