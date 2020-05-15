<template>
  <div class="main">
    <h1>Demo42 - 展开收起小动画</h1>
    <div class="modal" ref="modal" @click="toggleModal"></div>
    <div class="button" ref="button" @click="toggleModal">{{ text }}</div>
  </div>
</template>

<script>
import {getRect} from '@/utils/index.js';

export default {
  name: 'demo42',
  data() {
    return {
      isExpand: true,
      modalRectInit: {},
      buttonRectInit: {}
    };
  },

  computed: {
    text() {
      return this.isExpand ? '收起' : '展开';
    }
  },

  activated() {},

  methods: {
    toggleModal() {
      this.isExpand = !this.isExpand;
      this.animate(this.isExpand);
    },

    animate(reverse) {
      const modal = this.$refs.modal,
        button = this.$refs.button;

      modal.style.transform = 'none';

      this.buttonRectInit = getRect(button);
      this.modalRectInit = getRect(modal);

      const scaleX = this.buttonRectInit.width / this.modalRectInit.width,
        scaleY = this.buttonRectInit.height / this.modalRectInit.height;

      let transformStart = ['translateX(-50%)', 'translateY(-50%)', 'scaleX(1)', 'scaleY(1)'].join(' ');

      let transformEnd = [
        `translateX(${this.buttonRectInit.left - this.modalRectInit.left}px)`,
        `translateY(${this.buttonRectInit.top - this.modalRectInit.top}px)`,
        `scaleX(${scaleX})`,
        `scaleY(${scaleY})`
      ].join(' ');

      if (reverse) {
        [transformStart, transformEnd] = [transformEnd, transformStart];
      }

      const keyFrames = [{transform: transformStart}, {transform: transformEnd}];

      modal.animate(keyFrames, {
        duration: 400,
        easing: 'ease-in',
        iterations: 1
      });

      modal.style.transform = transformEnd;
    }
  },

  components: {}
};
</script>

<style scoped>
.modal {
  width: 480px;
  height: 360px;
  line-height: 360px;
  background: darkgoldenrod;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: top left;
  cursor: pointer;
  font-size: 14px;
  z-index: 2;
}
.button {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: aqua;
  cursor: pointer;
  font-size: 14px;
}
</style>
