<template>
	<div>
		<h1>demo16 -- 前端水印生成</h1>
    <img :src="src">
	</div>
</template>

<script>
	export default {
    data() {
      return {
        src: '',
      }
    },
    beforeMount() {
      this.makeWaterMark('你想要什么？')
    },
    destroyed() {
      const waterMarkEle = document.querySelector('#watermark');
      if (waterMarkEle) {
        waterMarkEle.parentNode.removeChild(waterMarkEle)
      }
    },
    methods: {
      makeWaterMark(content, {
        container = document.body,
        width = 250,
        height = 200,
        textAlign = 'center',
        textBaseline = 'middle',
        font = '20px 微软雅黑',
        fillStyle = 'rgba(184, 184, 184, 0.8)',
        angle = 30,
        zIndex = 11000,
      } = {}) {
        // 创建画布
        const cvs = document.createElement('canvas');
        // 画布尺寸
        cvs.width = width;
        cvs.height = height;
        // 上下文
        const ctx = cvs.getContext('2d');
        // 文字样式
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        // 文字旋转
        ctx.rotate(angle * Math.PI / 180);
        // 绘制文字
        ctx.fillText(content, width / 2, height / 2);
        // 生成base64图片编码
        const base64Url = cvs.toDataURL();
        // 生成水印容器div
        const div = document.createElement('div');
        // CSS属性
        div.id = 'watermark';
        const divStyle = `
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`;
        div.setAttribute('style', divStyle);
        // 插入容器
        container.insertBefore(div, null);
        // 监控DOM变动
        const MutationObserver = window.MutationObserver || window.webkitMutationObserver;
        if (MutationObserver) {
          let mo = new MutationObserver(() => {
            const watermark = document.querySelector('#watermark');
            if ((watermark && watermark.getAttribute('style') !== divStyle) || !watermark) {
              // 避免循环触发
              mo.disconnect();
              mo = null;
              this.makeWaterMark.apply(this, [].slice.call(arguments))
            }
          });
          // 监听对象
          const config = {
            attributes: true,
            childList: true,
            subtree: true
          };
          mo.observe(container, config)
        }
        return base64Url
      }
    },
    components: {},
  }
</script>

<style scoped>
</style>
