<template>
	<div class="child-main">
		<slot></slot>
		<p>this is outside component</p>
		<p>{{value.message}}</p>
		<button @click="changeMessage">更改父组件传递给子组件的对象消息</button>
		<button @click="emitFather">触发父组件事件</button>
		<slot name="slot1">slot1插槽的默认内容</slot>
		<slot name="slot2" text="hello from child">slot2插槽的默认内容</slot>

	</div>
</template>

<script>
	import _ from 'lodash';
	export default {
		name: 'demo1-1',
		props: {
			'betweenValue': Object,
			required: true
		},
		data(){
			return {
				value: this.betweenValue
			}
		},
		methods: {
			changeMessage: function () {
				this.value.message = 'wrong behavior';
			},
			emitFather(){
			  this.$emit('test')
			}
		}
	}
</script>

<style>
	.child-main {
		width: 80%;
		margin: 0 auto;
		border: 1px solid #2c3e50;
	}

</style>
