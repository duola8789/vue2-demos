<template>
  <div class="container">
    <p>Demo21 Child2 - Content Editable</p>
    <div contenteditable="true" @input="getOut"></div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      childText: this.value
    }
  },
  mounted() {
    this.$root.eventBus.$on('test', e => {
      console.log('received message from eventBus23: ', e)
    })
  },
  methods: {
    getOut(e) {
      this.$emit('input', e.target.innerText)
    }
  }
}
</script>

<style scoped>
.container {
  width: 450px;
  margin: 20px auto;
  padding: 10px;
  font-size: 18px;
  border: 1px solid darkgray;
  text-align: left;
}
</style>
