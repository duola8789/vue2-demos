<template>
	<div>
		<h1>demo7 -- TODO List</h1>
		<label>
			<input class="add-input"
						 type="text"
						 v-model="newTodo"
						 placeholder="Add a todo"
						 @keyup.enter="addTodo"
						 @keyup.esc="clearInput">
			<button @click="addTodo">add</button>
			<button @click="clearInput">clear</button>
			<button @click="clearAll">clearAll</button>
		</label>
		<ul class="todo-container" v-if="todoList.length > 0">
			<li is="child"
					v-for="(todo, index) of todoList"
					:key="todo.content"
					:content="todo" @deleteTodo="deleteHandler(index)">
				{{index + 1}}.
			</li>
		</ul>
		<ul class="finished-container" v-if="finishedList.length > 0">
			<li v-for="(todo, index) of finishedList" :key="todo.content + 'f'" class="finished-todo">
				{{index + 1}}. {{todo.content}}
			</li>
		</ul>
	</div>
</template>

<script>
	import child from './demo7-1.vue';
	import {mapGetters} from 'vuex';
	export default {
		name: 'App',
		data: function () {
			return {
				newTodo: '',
				todoList: []
			}
		},
		computed: {
			finishedList: function () {
				return this.todoList.filter((value) => (value.finished))
			}
		},
		methods: {
			addTodo(event){
				console.log(event);
				if (!this.newTodo) {
					alert('请输入内容');
					return;
				}
				this.todoList.push({
					content: this.newTodo,
					finished: false
				});
				this.clearInput()
			},
			clearInput(){
				this.newTodo = ''
			},
			clearAll(){
				this.todoList = [];
			},
			deleteHandler(index){
				this.todoList.splice(index, 1)
			}
		},
		components: {
			child
		}
	}
</script>

<style scoped>
	.add-input {
		width: 200px;
		padding: 5px;
		font-size: 16px;
	}
	.todo-container {
		width: 500px;
		margin: 30px auto;
		border-bottom: 5px solid gray;
	}
	.finished-container {
		width: 500px;
		margin: 30px auto;
	}
	.finished-todo {
		margin: 10px 0;
		padding-bottom: 5px;
		font-size: 20px;
		border-bottom: 1px dashed cornflowerblue;
	}
	.finished-todo:last-child {
		border-bottom: none
	}
</style>
