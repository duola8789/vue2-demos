<template>
  <div class="container my-loading">
    <div class="logo"></div>
    <p class="text">This is My Loading -- {{msg}}</p>
  </div>
</template>

<script>
  export default {
    props: [ 'msg' ],
    name: 'MyLoading'
  }
</script>

<style scoped>
  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    padding-top: 200px;
  }
  .logo {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border: 10px solid darkcyan;
    border-right-color: darkgray;
    border-radius: 50%;
    animation: myRotate 2s linear infinite
  }
  @keyframes myRotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .text {
    margin-top: 20px;
    text-align: center;
  }
</style>
