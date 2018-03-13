<template>
	<div class="main">
		<p :class="class1">{{message}}</p>
		<button @click="changeSeen" class="click-btn">{{seenText}}</button>
		<span v-if="seen">v-if绑定</span>
		<section></section>
		<p v-for='(text, index) in textArray' :key="text.id">
			index: {{index}} ----- id: {{text.id}} ------ name: {{text.name}}
		</p>
		<label><input v-model="inputValue"></label>
		<p>输入框中输入的内容是{{inputValue}}</p>
		<demo2 :betweenValue="fatherValue"></demo2>
		<todo-Item betweenValue2="hello"></todo-Item>
	</div>
</template>

<script>
	import demo2 from '@/components/demos/demo2';
	const MESSAGE = 'This is demo 1',
		HIDE_TEXT = 'Hide text right',
		SHOW_TEXT = 'Show text right';
	const TEXTS = [
		{id: 1000, name: 'jay'},
		{id: 1001, name: 'chow'},
		{id: 1002, name: 'old'},
	];
	export default {
		name: 'demo1',
		data(){
			return {
				message: MESSAGE,
				class1: 'text',
				seen: true,
				textArray: TEXTS,
				inputValue: '',
				fatherValue: 'This message is from demo1 which is father component'
			}
		},
		computed: {
			seenText(){
				return this.seen ? HIDE_TEXT : SHOW_TEXT
			}
		},
		methods: {
			changeSeen(){
				this.seen = !this.seen
			}
		},
		components: {
			demo2,
			todoItem: {
				props: ['betweenValue2'],
				template: '<p>this is a inside component --- {{betweenValue2}}</p>'
			}
		}
	}
</script>

<style scoped>
	.main {
		font-size: 16px;
		color: darkcyan;
	}
	.main p {
		margin: 10px 0;
	}
	.text {
		font-size: 16px;
		color: darkkhaki;
	}
	.click-btn {
		background: floralwhite;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: none;
		border: 1px solid olive;
		padding: 5px;
		margin-right: 10px;
	}
</style>
