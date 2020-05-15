/**
 * Created by zh on 2018/3/14.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {logger} from './plugins/logger';

import todoList from './modules/todo-list';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    title: 'Vuex',
    subTitle: {
      message: 'TodoList'
    }
  },
  mutations: {
    changeSubTitle(state, {message}) {
      state.subTitle.message = message;
    },
    changeTitle(state, {message}) {
      state.title = message;
    }
  },
  modules: {
    store_todoList: todoList
  },
  plugins: [logger]
});

// 热重载，使用时将下面的判断反转即可
// 如果配置了热重载，那么如果改动state时就必须手动刷新，热刷新也没有了；
// 如果不配置热重载，修改任何文件都是热刷新。这样的话热重载我感觉意义不大
if (!module.hot) {
  module.hot.accept(['./modules/todo-list'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，下面需要加上 .default
    const newTodoList = require('./modules/todo-list').default;

    console.log(newTodoList);

    // 加载新模块
    store.hotUpdate({
      modules: {
        store_todoList: newTodoList
      }
    });
  });
}

export default store;
