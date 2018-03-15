<template>
	<div>
		<h1>demo5 -- 绑定class 和条件渲染</h1>
		<p class="item">
			<span class="title">内联模版绑定class</span>
			<span :class="{ class1: class1Active, class2: class2Active}">动态绑定class</span>
		</p>
		<p class="item">
			<span class="title">计算属性绑定class</span>
			<button :class="class3Active" @click="add">This button has been clicked {{times}} times</button>
		</p>
		<p class="item">
			<span class="title">数组绑定class</span>
			<span :class="[times > 2 ? class5 : class4, class6]">动态绑定class</span>
		</p>
		<p class="item">
			<span class="title">不添加key值</span>
			<label>
				<input v-if="times<2" :class="[times > 2 ? class5 : class4, class6]" type="text" placeholder="text">
				<input v-else-if="times>=2 && times<5"
							 :class="[times > 2 ? class5 : class4, class6]"
							 type="email"
							 placeholder="email">
				<input v-else :class="[times > 2 ? class5 : class4, class6]" type="tel" placeholder="phone">
			</label>
		</p>
		<p class="item">
			<span class="title">添加key值</span>
			<label>
				<input v-if="times<2"
							 :class="[times > 2 ? class5 : class4, class6]"
							 type="text"
							 placeholder="text" key="text">
				<input v-else-if="times>=2 && times<5"
							 :class="[times > 2 ? class5 : class4, class6]"
							 type="email"
							 placeholder="email"
							 key="email">
				<input v-else :class="[times > 2 ? class5 : class4, class6]" type="tel" placeholder="phone" key="phone">
			</label>
		</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				class1Active: true,
				class2Active: false,
				class5: 'class5',
				class6: 'class6',
				class4: 'class4',
				times: 0
			}
		},
		methods: {
			add(){
				this.times++
			}
		},
		computed: {
			class3Active: function () {
				return this.times > 5 ? 'class3' : 'class4'
			}
		}
	}
</script>

<style>
	.class1 {
		color: cadetblue;
	}
	.class2, .class6 {
		border: 3px solid lightblue;
	}
	.class3, .class5 {
		background: antiquewhite;
	}
	.class4 {
		background: cornflowerblue;
	}
</style>
