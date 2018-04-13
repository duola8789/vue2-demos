<template>
	<div class="right">
		<h1>右边的组件</h1>
    <p>左边的输入的是：{{value}}</p>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    computed: {},
    mounted() {
      this.$eventBus.$on('receiveMessage', (message) => {
        this.showMessage(message)
      })
    },
    methods: {
      showMessage(message) {
        this.value = message
      }
    },
    components: {}
  }
</script>

<style>
  .right p {
    text-align: left;
    margin-left: 15px;
    margin-top: 25px;
    font-size: 16px
  }
</style>
