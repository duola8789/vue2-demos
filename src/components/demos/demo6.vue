<template>
	<div>
		<h1>demo6 -- 列表渲染</h1>
		<p class="item" v-for="(item, index) of items" :key="'array'+item + index">
			<span>序号{{index}} --- 数组循环{{item}}</span>
		</p>
		<p class="item" v-for="(value, key, index) of objectItems" :key="key">
			<span>序号{{index}} --- {{key}} --- {{value}}</span>
		</p>
		<p class="item">
			<span>利用索引直接设置一个项时不会触发视图变更</span>
			<button @click="changeArray">CLICK</button>
		</p>
		<p class="item">
			<span>用splice方法代替</span>
			<button @click="changeArray2">CLICK</button>
		</p>
		<p class="item">
			<span>不能相应添加的属性</span>
			<button @click="changeObject">CLICK</button>
		</p>
		<p class="item">
			<span>要用添加属性后的对象代替原对象</span>
			<button @click="changeObject2">CLICK</button>
		</p>
		<p class="item" v-for="(item, index) of computedItems" :key="'reverse' + item + index">
			<span>序号{{index}} --- 数组循环{{item}}</span>
		</p>
	</div>
</template>

<script>
	const DEMO_NUMBER = 6;
	const DEMO_OBJECT = {
		NAME: 'CHOW',
		AGE: '31',
		CAREER: 'CODER'
	};
	export default {
		name: 'App',
		data: function () {
			return {
				items: this.getDemoArray(),
				objectItems: DEMO_OBJECT
			}
		},
		computed: {
			computedItems: function () {
				return this.items.filter((value) => (value % 2 === 0))
			}
		},
		methods: {
			getDemoArray(){
				let arr = [];
				for (let i = 0; i < DEMO_NUMBER; i++) {
					arr.push(i + 1)
				}
				return arr;
			},
			changeArray(){
				this.items[0] = 100
			},
			changeArray2(){
				this.items.push(100)
			},
			changeObject(){
				this.objectItems.HEIGHT = 180;
			},
			changeObject2(){
				this.objectItems = Object.assign({}, this.objectItems, {HEIGHT: 180});
//				 或者
//				this.objectItems = {
//					...this.objectItems,
//					HEIGHT: 180
//				}
			}
		}
	}
</script>

<style>

</style>
