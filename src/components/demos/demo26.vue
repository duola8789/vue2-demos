<template>
  <div>
    <h1>canvas</h1>
    <canvas width='500' height='200' id='drawing'>I can draw something here.</canvas>
  </div>
</template>

<script>

export default {
  name: 'demo26',
  props: [],
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    const drawing = document.querySelector('#drawing');
    const ctx = drawing.getContext('2d');

    /**
     * Canvas是基于状态的绘制
     * 如果在代码中更改颜色，然后一次性绘制`stroke`，那么只会保留最后一次颜色需要多次`stroke`
     * 但是为了防止覆盖，需要在每段绘制之前加上`beginPath`，代表下次绘制的起始之处为`beginPath()`之后的代码，让绘制方法不重复绘制
     */

    // 表盘外围
    ctx.beginPath();
    const outerCircle = {
      x: 250,
      y: 100,
      r: 80,
      sAngel: 0,
      endAngel: Math.PI * 2,
    };
    ctx.strokeStyle = 'red';
    ctx.arc(outerCircle.x, outerCircle.y, outerCircle.r, outerCircle.sAngel, outerCircle.endAngel, false);
    ctx.closePath();
    ctx.stroke();

    // 表盘内层
    ctx.beginPath();
    const innerCircle = {
      x: 250,
      y: 100,
      r: 72,
      sAngel: 0,
      endAngel: Math.PI * 2,
    };
    ctx.strokeStyle = 'blue';
    ctx.moveTo(outerCircle.x + innerCircle.r, innerCircle.y);
    ctx.arc(innerCircle.x, innerCircle.y, innerCircle.r, innerCircle.sAngel, innerCircle.endAngel, false);
    ctx.closePath();
    ctx.stroke();

    // 不移动原点
    // // 时针
    // const hourLine = {
    //   startX: 250,
    //   startY: 100,
    //   endX: 220,
    //   endY: 70,
    // };
    // ctx.moveTo(hourLine.startX,hourLine.startY);
    // ctx.lineTo(hourLine.endX, hourLine.endY);
    //
    // // 分针
    // const minuteLine = {
    //   startX: 250,
    //   startY: 100,
    //   endX: 300,
    //   endY: 70,
    // };
    // ctx.moveTo(minuteLine.startX,minuteLine.startY);
    // ctx.lineTo(minuteLine.endX, minuteLine.endY);

    // 移动原点
    ctx.translate(innerCircle.x, innerCircle.y);

    // 时针
    ctx.beginPath();
    ctx.strokeStyle = 'pink';
    const hourLine = {
      startX: 0,
      startY: 0,
      endX: -30,
      endY: -30,
    };
    ctx.moveTo(hourLine.startX,hourLine.startY);
    ctx.lineTo(hourLine.endX, hourLine.endY);
    ctx.closePath();
    ctx.stroke();

    // 分针
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    const minuteLine = {
      startX: 0,
      startY: 0,
      endX: 40,
      endY: -40,
    };
    ctx.moveTo(minuteLine.startX,minuteLine.startY);
    ctx.lineTo(minuteLine.endX, minuteLine.endY);
    ctx.closePath();
    ctx.stroke();
  },
  // 获取选取
  methods: {},
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
canvas, .drag-zone {
  margin: 20px 0;
  border: 1px solid rosybrown;
}
.drag-zone {
  width: 500px;
  height: 200px;
  text-align: center;
}
</style>
