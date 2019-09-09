<template>
  <div>
    <h1>demo37 -- Vuex</h1>
    <p>The number is {{count}}</p>
    <button>add</button>
  </div>
</template>

<script>
  export default {
    name: 'demo37',
    props: [],
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
      count() {
        return this.$store.state.count;
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin: 20px 0
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
  }
</style>
