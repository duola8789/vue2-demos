<template>
  <div>
    <h1>图片对比</h1>
    <div ref="imgContainer" class="img-container" @mousemove="mouseMove">
      <div class="separator" :style="{ 'left': separatorX + 'px' }"></div>
      <div class="origin-image" :style="{ 'width': originWidth + 'px'}"></div>
      <div class="handled-image" :style="{ 'width': handledWidth + 'px'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'demo35',
    props: [],
    data() {
      return {
        containerX: 0,
        containerWidth: 0,
        separatorX: 0,
        separatorWidth: 4,
      }
    },
    mounted() {
      const { left, width } = this.$refs.imgContainer.getBoundingClientRect();
      this.containerX = left;
      this.containerWidth = width;
      
    },
    methods: {
      mouseMove(e) {
        const min = 0, max = this.containerWidth - this.separatorWidth;
        // 当前坐标值
        const result = e.clientX - this.containerX;
        
        if (result <= max && result >= min) {
          this.separatorX = result
        } else if (result < min) {
          this.separatorX = min
        } else {
          this.separatorX = max
        }
      }
    },
    computed: {
      originWidth() {
        return this.separatorX
      },
      handledWidth() {
        return this.containerWidth - this.originWidth - this.separatorWidth
      }
    }
  }
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
  .separator:before, .separator:after {
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
  .origin-image, .handled-image {
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
