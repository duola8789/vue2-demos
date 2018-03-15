<template>
	<div class="child-main">
		<p>this is outside component</p>
		<p>{{betweenValue}}</p>
	</div>
</template>

<script>
	export default {
		name: 'demo1-1',
		props: ['betweenValue'],
		data(){
			return {}
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
