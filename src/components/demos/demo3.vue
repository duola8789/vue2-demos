<template>
	<div>
		<h1>demo3 -- 计算属性和方法</h1>
		<p class="item"><span class="title">Base Message</span>{{message}}</p>
		<p class="item"><span class="title">Another Message</span>{{anotherMessage}}</p>
		<p class="item"><span class="title">使用计算属性</span>{{computedMessage}}</p>
		<p class="item"><span class="title">使用方法</span>{{methodMessage()}}</p>
		<p class="item"><span class="title">计算属性的setter</span>{{setMessage}}</p>
		<P class="item item-explain">setter的意义就是在于：getter只能根据计算属性的依赖默认的输出结果，而setter可以手动的更改计算属性的依赖，从而更新计算属性</P>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				message: 'This is a base message',
				anotherMessage: 'This is a base anotherMessage',
			}
		},
		computed: {
			computedMessage: function () {
				return this.message.split('').reverse().join('')
			},
			setMessage: {
			  get(){
			    return this.message + '000'
				},
				set(newValue){
			    this.anotherMessage = newValue
				}
			}
		},
		methods: {
			methodMessage: function () {
				console.log('method is called');
				return this.message.split('').reverse().join('')
			}
		},
		watch: {
			anotherMessage: function () {
				console.log('anotherMessage has been changed')
			}
		},
		components: {},
		beforeUpdate(){
			console.log('beforeUpdate')
		},
		updated(){
			console.log('updated')
		},
	}
</script>

<style>

</style>
