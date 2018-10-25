<template>
  <div>
    <h1>demo21 v-model on Component</h1>
    <p>Text from child1: {{text}}</p>
    <p>Text from child2: {{text2}}</p>
    <Child v-model="text"></Child>
    <Child2 v-model="text2"></Child2>
  </div>
</template>

<script>
import Child from '@/components/demos/demo21/child';
import Child2 from '@/components/demos/demo21/child2';

export default {
  data() {
    return {
      text: '',
      text2: ''
    }
  },
  computed: {},
  methods: {},
  components: {
    Child,
    Child2
  }
}
</script>

<style scoped>
</style>
