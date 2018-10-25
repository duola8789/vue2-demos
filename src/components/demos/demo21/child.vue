<template>
  <div class="container">
    <p>Demo21 Child - input</p>
    <label><input :value="value" @input="getOut"></label>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {}
  },
  methods: {
    getOut(e) {
      this.$emit('input', e.target.value)
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
