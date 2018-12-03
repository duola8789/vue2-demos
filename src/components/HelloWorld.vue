<template>
	<div class="hello">
		<div>
			<img src="@/assets/logo.png">
			<h1>{{ msg }}</h1>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data () {
			return {
				msg: 'Vue Learning Demos'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	ul, ol {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
	.hello {
    padding-top: 30vh
	}
</style>
