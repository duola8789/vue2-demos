<template>
    <div id="app">
        <ul class="nav">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/user" exact>User</router-link></li>
            <li><router-link to="/about" exact>about</router-link></li>
        </ul>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {}
  },
  methods: {
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
        padding: 20px 0 0 40px;
        width: 150px;
        flex-shrink: 0;
        overflow-y: auto;
    }
    .nav li {
        margin: 20px 0;
    }
    .content {
        border-left: 1px solid gray;
        padding: 30px 20px;
        flex-grow: 1;
        box-sizing: border-box;
        overflow-y: auto;
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
</style>
