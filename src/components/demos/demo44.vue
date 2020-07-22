<template>
  <div class="main">
    <h1>Demo44 - 虚拟列表</h1>
    <div class="container" ref="container" @scroll="scroll">
      <div class="placeholder" :style="{height: placeholderHeight}"></div>
      <ul class="list-container" :style="{transform: contentTransform}">
        <li v-for="item in visibleData" :key="item" class="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const DATA_LENGTH = 100000;
const data = Array.from({length: DATA_LENGTH}).map((v, index) => `item-${index}`);

const EXTRA_NUM = 2;

export default {
  name: 'demo43',
  data() {
    return {
      data,
      startIndex: 0,
      visibleNum: 0,
      scrollTop: 0
    };
  },
  props: {
    id: {
      require: true,
      type: String
    }
  },

  computed: {
    itemHeight() {
      const itemHeight = 50;
      const gap = 5;
      return itemHeight + gap;
    },

    visibleData() {
      if (this.visibleNum === 0) {
        return this.data.slice(0, 100);
      }
      return this.data.slice(this.startIndex, this.startIndex + this.visibleNum + 1);
    },

    placeholderHeight() {
      return this.itemHeight * this.data.length + 'px';
    },

    contentTransform() {
      const translateY = this.itemHeight * this.startIndex;
      return `translate3d(0, ${translateY}px, 0)`;
    }
  },

  methods: {
    scroll() {
      console.log(this.scrollTop);

      this.scrollTop = this.$refs.container.scrollTop;
      this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    }
  },

  mounted() {
    const containerHeight = this.$refs.container.clientHeight;
    this.visibleNum = Math.ceil(containerHeight / this.itemHeight);
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  width: 500px;
  height: 520px;
  margin: 50px auto;
  overflow: scroll;
  border: 1px solid gray;
  z-index: 1;

  .list-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    .item {
      height: 50px;
      line-height: 50px;
      background: #42b983;
      margin-bottom: 5px;
    }
  }

  .placeholder {
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    z-index: -1;
  }
}
</style>
