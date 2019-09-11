/**
 * Created by zh on 2018/3/14.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { logger } from './plugins/logger'

import todoList from './modules/todo-list.js'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    title: 'Vuex',
    subTitle: {
      message: 'TodoList'
    }
  },
  mutations: {
    changeSubTitle(state, { message }) {
      state.subTitle.message = message;
    },
    changeTitle(state, { message }) {
      state.title = message;
    }
  },
  modules: {
    store_todoList: todoList,
  },
  plugins: [logger]
})
