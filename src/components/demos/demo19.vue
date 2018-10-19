<template>
  <div>
    <h1>demo19 动态读取图片</h1>
    <div class="image-container">
      <img v-for="img in images" :src="img" :key="img" class="insert">
    </div>
  </div>
</template>

<script>
const context = require.context('@/assets/images/demos/demo19', false, /.*\.(jpg|png)$/);
const images = context.keys().map(v => context(v));
export default {
  data() {
    return {
      images,
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.image-container {
  margin: 10px 0 0 10px;
}
.insert {
  width: 200px;
  max-height: 500px;
  vertical-align: top;
}
</style>
