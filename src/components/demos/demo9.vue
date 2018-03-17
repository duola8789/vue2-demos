<template lang="pug">
	ul
		- var arr = [1,2,3]
		each value in arr
			li(id="test" + value) value + {{this.name}}
</template>

<script>
	export default {
		data(){
			return {
				name: 'chow'
			}
		},
		computed: {},
		methods: {},
		components: {}
	}
</script>

<style>

</style>
