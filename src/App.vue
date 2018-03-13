<template>
	<div id="app">
		<ul class="nav">
			<li>
				<router-link to="/" exact>Home</router-link>
			</li>
			<li>
				<router-link to="/demo1">Demo-01</router-link>
			</li>
			<li>
				<router-link to="/demo2">Demo-02</router-link>
			</li>
		</ul>
		<div class="content">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	html, body {
		overflow: hidden;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		display: flex;
		width: 100%;
		height: 100%;
	}
	h1, h2 {
		font-weight: normal;
	}
	ul, ol {
		list-style-type: none;
		padding: 0;
		text-align: left;
	}
	.nav {
		border-right: 1px solid gray;
		padding: 40px 0 0 15px;
		width: 100px;
		flex-shrink: 0;
	}
	.nav li {
		margin: 20px 0;
	}
	.content {
		width: 85%;
		min-width: 500px;
		padding: 50px 0;
	}
	a {
		color: gray
	}
	.router-link-active {
		color: #42b983;
	}
</style>
