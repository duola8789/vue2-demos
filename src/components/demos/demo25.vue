<template>
  <div>
    <h1>富文本编辑器</h1>
    <div class="inner-content" contenteditable="true" @mouseup="input"></div>
  </div>
</template>

<script>

export default {
  name: 'demo25',
  props: [],
  data() {
    return {
      value: '',
    }
  },
  mounted() {
  },
  // 获取选区
  methods: {
    input(e) {
      if(document.getSelection().toString()) {
        console.log(document.getSelection().toString())
      }
    }
  },
  computed: {}
}
</script>
<style scoped>
.inner-content {
  width: 500px;
  height: 500px;
  margin: 20px auto;
  padding: 20px;
  text-align: left;
  border: 1px solid darkcyan;
}
</style>
