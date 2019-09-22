<template>
  <div class="container">
    <h2>demo38 - 1 - id: {{id}}</h2>
  </div>
</template>

<script>
export default {
  name: 'demo38-1',
  props: ['id'],
  data() {
    return {
    }
  },
}
</script>

<style scoped>
  .container {
    width: 200px;
    height: 50px;
    background: aqua;
    margin: 0 auto;
  }
</style>
