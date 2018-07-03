<template>
	<div class="main">
		<h1 :class="class1">{{message}}</h1>
		<button @click="changeSeen" class="click-btn">{{seenText}}</button>
		<span v-if="seen">v-if绑定</span>
		<section></section>
		<p v-for='(text, index) in textArray' :key="text.id">
			index: {{index}} ----- id: {{text.id}} ------ name: {{text.name}}
		</p>
		<label><input v-model="inputValue"></label>
		<p>输入框中输入的内容是{{inputValue}}</p>
		<p>
			<span>父组件的信息：</span>
			<span>{{fatherValue.message}}</span>
		</p>
		<demo1_1 :betweenValue="fatherValue" @test="changeSeen">
			<p slot="slot1">父组件的内容插入slot1插槽</p>
			<p>父组件的内容插入默认插槽</p>
			<template slot='slot2' slot-scope="{text}">
				{{text}}
			</template>
		</demo1_1>
		<todo-Item betweenValue2="hello"></todo-Item>
	</div>
</template>

<script>
	import demo1_1 from '@/components/demos/demo1-1';
	const MESSAGE = 'This is demo 1 -- 基础',
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
				fatherValue: {message : '父组件传给子组件的信息'},
				test: ''
			}
		},
		mounted() {
			console.log(this.test, '-----------------');
			this.test = 123;
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
			demo1_1,
			todoItem: {
				props: ['betweenValue2'],
				template: '<p>This is a inside component --- {{betweenValue2}}</p>'
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
