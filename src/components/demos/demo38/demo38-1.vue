<template>
  <div class="container">
    <button @click="clickHandler">123</button>
  </div>
</template>

<script>
export default {
  name: 'demo38-1',
  props: ['id'],
  data() {
    return {
      ok: 'ok'
    };
  },
  methods: {
    clickHandler() {
      this.id(999);
    }
  }
};
</script>

<style scoped>
.container {
  width: 200px;
  height: 50px;
  background: aqua;
  margin: 0 auto;
}
</style>
