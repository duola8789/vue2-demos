/**
 * Created by zh on 2018/3/14.
 */
import axios from 'axios';

const URL = 'https://yesno.wtf/api';

// UUID
const makeId = (function uuid() {
  let id = 0;
  return function () {
    return id++;
  };
})();

const state = {
  todoList: [
    {content: '听音乐', done: true, id: makeId()},
    {content: '写代码', done: false, id: makeId()},
    {content: '玩游戏', done: false, id: makeId()}
  ]
};

const getters = {
  totalCount: (state) => state.todoList.length,
  doneTodos: (state) => state.todoList.filter((value) => value.done),
  doneCount: (state, getters) => getters.doneTodos.length
};

const actions = {
  async addTodo({commit}, {content}) {
    const {
      data: {answer, image}
    } = await axios.get(URL);
    // yes 时添加
    if (answer === 'yes') {
      commit('addTodo', {content});
    }
    return image;
  }
};

const mutations = {
  // 添加
  addTodo(state, {content}) {
    const newTodo = {
      content,
      done: false,
      id: makeId()
    };
    state.todoList.push(newTodo);
  },

  // 修改
  changeTodoState(state, {id, checked}) {
    const target = state.todoList.find((v) => v.id === id);
    if (!target) {
      return false;
    }
    target.done = checked;
    return true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
