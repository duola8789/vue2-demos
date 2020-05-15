<template>
  <div>
    <h1>图片对比</h1>
    <ImageComparison :images="images" />
  </div>
</template>

<script>
import images1 from '@/assets/images/1.jpg';
import images2 from '@/assets/images/3.jpg';

export default {
  name: 'demo35',
  props: [],
  data() {
    return {
      images: [images1, images2]
    };
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>
<style scoped>
.img-container {
  position: relative;
  width: 970px;
  height: 647px;
  border: 1px solid darkgray;
  margin: 50px auto;
}
.separator {
  position: absolute;
  top: 0;
  left: 200px;
  width: 4px;
  height: 100%;
  background: darkgray;
  z-index: 3;
}
.separator:before,
.separator:after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
}
.separator:before {
  right: 10px;
  border-right-color: darkgray;
}
.separator:after {
  left: 10px;
  border-left-color: darkgray;
}
.origin-image,
.handled-image {
  position: absolute;
  top: 0;
  height: 100%;
}
.origin-image {
  left: 0;
  background: aquamarine;
  z-index: 2;
}
.handled-image {
  right: 0;
  background: yellowgreen;
  z-index: 1;
}
</style>
