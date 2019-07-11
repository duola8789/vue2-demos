<template>
  <div :style="containerStyle">
    <div ref="imgContainer" class="img-container" @mousemove="mouseMove">
      <div class="separator" :style="{ 'left': separatorX + 'px' }"></div>
      <div class="origin-image" :style="{ 'width': originWidth + 'px'}">
        <img v-if="originImageSrc" class="image" :src="originImageSrc" alt="">
      </div>
      <div class="handled-image" :style="{ 'width': handledWidth + 'px'}">
        <img v-if="handledImageSrc" class="image" :src="handledImageSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImageComparison',
    props: {
      containerStyle: {
        type: Object,
        default() {
          return {
            width: '970px',
            height: '647px',
            margin: '0 auto',
          }
        }
      },
      images: {
        type: Array,
        default() {
          return []
        },
        validator(value) {
          return value.length <= 2
        }
      }
    },
    data() {
      return {
        scrollX: 0,
        containerX: 0,
        containerWidth: 0,
        separatorX: 0,
        separatorWidth: 4,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getBoundingClientRect()
      })
     
    },
    methods: {
      getBoundingClientRect() {
        const { left, width } = this.$refs.imgContainer.getBoundingClientRect();
        this.containerX = left;
        this.containerWidth = width;
        this.scrollX = window.scrollX
      },
      
      mouseMove(e) {
        // 如果移动了滚动条，则重新计算距离
        if (this.scrollX !== window.scrollX) {
          this.getBoundingClientRect();
        }
        
        const min = 0, max = this.containerWidth - this.separatorWidth;
        
        // 当前坐标值
        const result = e.pageX - this.containerX - window.scrollX;
        
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
      },
      originImageSrc() {
        return this.images[0]
      },
      handledImageSrc() {
        return this.images[1]
      },
    }
  }
</script>
<style scoped>
  .img-container {
    position: relative;
    width: 100%;
    height: 100%;
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
    overflow: hidden;
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
