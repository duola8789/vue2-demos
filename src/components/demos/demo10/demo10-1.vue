<template>
	<div>
		<h1>左边的组件</h1>
    <div class="input">
      <label><input type="text" v-model="leftMessage" @change="changeHandler"></label>
    </div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        leftMessage: ''
      }
    },
    computed: {},
    methods: {
      changeHandler() {
        this.$eventBus.$emit('receiveMessage', this.leftMessage)
      }
    },
    components: {}
  }
</script>

<style>
  .input {
    margin: 20px;
  }
  .input input {
    padding: 5px;
    font-size: 16px;
  }
</style>
