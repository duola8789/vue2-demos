<template>
	<div id="app">
		<ul class="nav">
			<li>
				<router-link to="/" exact>Home</router-link>
			</li>
			<li v-for="demo of demos" :key="demo">
				<router-link :to="`demo${demo}`">Demo-{{needZero(demo)}}{{demo}}</router-link>
			</li>
		</ul>
		<div class="content">
			<router-view :identity="identity"/>
		</div>
	</div>
</template>

<script>
  const requireComponent  = require.context('./components/demos', true, /demo[1-9][0-9]?\.vue$/);
	const DEMO_NUMBER = requireComponent.keys().length;

  export default {
    name: 'App',
    data: function () {
      return {
        demos: DEMO_NUMBER,
        identity: {
          id: 123,
          role: 123,
        }
      }
    },
    methods: {
      getDemoArray() {
        let arr = [];
        for (let i = 0; i < DEMO_NUMBER; i++) {
          arr.push(i + 1)
        }
        return arr;
      },
      needZero (number){
        return  number < 10  ? '0' : null
      }
    }
  }
</script>

<style>
	* {
    margin: 0;
    padding: 0;
  }
  html, body {
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
    min-height: 100%;
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
    padding: 50px 0 0 40px;
    width: 120px;
    flex-shrink: 0;
  }
  .nav li {
    margin: 20px 0;
  }
  .content {
    padding: 30px 20px;
    flex-grow: 1;
    box-sizing: border-box;
  }
  .inner-content {
    margin-top: 30px;
  }
  a {
    color: gray
  }
  .router-link-active {
    color: #42b983;
  }
  button {
    background: floralwhite;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: 1px solid olive;
    padding: 5px;
    margin: 10px 0;
    border-radius: 4px;
  }
  h1 {
    font-size: 36px;
    font-weight: bold;
    color: darkkhaki;
  }
  p {
    margin: 10px 0;
  }
  .title {
    display: inline-block;
    width: 150px;
    margin-right: 15px;
    color: crimson;
  }
  .item {
    width: 400px;
    margin: 10px auto;
    padding-left: 20px;
    text-align: left;
  }
  .item-explain {
    color: gray;
    font-style: italic;
  }
</style>
