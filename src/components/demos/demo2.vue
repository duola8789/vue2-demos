<template>
	<div>
		<h1>demo2 -- 实例方法和模版</h1>
		<button @click="addClickedTime" :disabled="clickedTime >= 5">
			The button has been clicked {{clickedTime}} times
		</button>
		<p class="item"><span class="title">computed</span>The random number is {{randomNumber}}</p>
		<p class="item"><span class="title">v-once</span><span>The random number is {{randomNumber}}</span></p>
		<p class="item"><span class="title">v-html</span><span v-html="message2"></span></p>
		<p class="item">
			<span class="title">.prevent修饰符</span>
			<a @click.prevent="justAlert" href="//www.baidu.com">Prevent jumping</a>
		</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				clickedTime: 0,
				message2: '<span style="color:red">This should be red</span>',
			}
		},
		computed: {
			randomNumber: function () {
				return this.clickedTime + Math.round((Math.random() * 100)) / 100
			}
		},
		methods: {
			addClickedTime(){
				this.clickedTime += 1
			},
			justAlert(){
				alert('just alert')
			}
		},
		components: {},
		beforeCreate(){
			console.log('beforeCreate')
		},
		created(){
			console.log('created')
		},
		beforeMount(){
			console.log('beforeMount')
		},
		mounted(){
			console.log('mounted')
		},
		created(){
			console.log('created')
		},
		beforeUpdate(){
			console.log('beforeUpdate')
		},
		updated(){
			console.log('updated')
		},
		beforeDestroy(){
			console.log('beforeDestroy')
		},
		destroyed(){
			console.log('destroyed')
		}
	}
</script>

<style scoped>
</style>
