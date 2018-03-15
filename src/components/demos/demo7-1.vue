<template>
	<li class="todo-item">
		<span class="todo-content" :class="content.finished ? 'finished' : ''">
			<slot></slot>
			{{content.content}}
		</span>
		<button class="delete-btn" @click="deleteItem">delete</button>
		<label class="finish-btn"><input type="checkbox" @click="finishItem" :checked="content.finished"></label>
	</li>
</template>

<script>
	export default {
		data(){
			return {}
		},
		props: ['content'],
		computed: {},
		methods: {
			deleteItem(){
				this.$emit('deleteTodo')
			},
			finishItem(){
			  this.content.finished = !this.content.finished
			}
		},
		components: {}
	}
</script>

<style>
	.todo-item {
		height: 50px;
		line-height: 50px;
		margin: 10px 0;
		font-size: 20px;
		border-bottom: 1px dashed cornflowerblue;
	}
	.todo-item:last-child{
		border-bottom: none
	}
	.todo-content {
		float: left;
		height: 50px;
		line-height: 50px;
	}
	.finish-btn{
		float: right;
		height: 50px;
		line-height: 50px;
	}
	.delete-btn {
		float: right;
		margin: 12px 10px 0;
	}
	.finished{
		text-decoration: line-through;
	}
</style>
