<template>
  <div class="container">
    <p>This is a base mixin outside and I want to say {{text}}</p>
    <P>Name: {{name}}</P>
    <P>age: {{obj.age.value}}</P>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: 'hello'
    }
  },
  data() {
    return {
      name: 'chow',
      obj: {
        age: {
          value: 100
        }
      }
    }
  },
  methods: {
    refresh() {
      console.log('inner refresh')
    }
  },
  mounted() {
    this.refresh();
    console.log('inner mounted')
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
