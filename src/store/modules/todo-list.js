/**
 * Created by zh on 2018/3/14.
 */
const state = {
	todoList: [{content: 'ffff', finished: false}, {content: 'aaaa', finished: false}],
	count: 100
};

const getters = {
	finishedList: function (state) {
		return state.todoList.filter((value) => (value.finished))
	}
};

const actions = {
	addTodo(store, newTodo){
		store.commit('addTodo', newTodo)
	}
};

const mutations = {
	addTodo(state, newTodo){
		state.push(newTodo)
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
