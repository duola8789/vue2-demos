<template>
  <div>
    <h1>使用MyLoading插件</h1>
    <button @click="showLoading"> Show Loading</button>
  </div>
</template>

<script>
  export default {
    name: 'demo33',
    props: [],
    data() {
      return {
        title: ''
      }
    },
    mounted() {
    },
    methods: {
      showLoading(){
        this.showMyLoading('你好')
      }
    }
  }
</script>
<style scoped>
</style>
