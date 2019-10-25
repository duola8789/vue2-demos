<template>
  <div class="main">
    <h1>空的Demo，随便干什么</h1>

  </div>
</template>

<script>
export default {
  name: 'demo0',
  data() {
    return {
      message: '',
    }
  },

  mounted() {
    fetch('https://xy.com:8888/').then(v => v.json()).then(v => { this.message = v.message })
  },

  computed: {
  },

  methods: {
  },
}
</script>

<style scoped>
  .main {
    font-size: 16px;
    color: darkcyan;
  }
</style>
