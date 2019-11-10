<template>
  <div>
    <h1>demo39 - XSS</h1>
    <div class="content">
      <h2>未防护</h2>
      <p>恶意：{{value}}</p>
      <p>正常：{{value2}}</p>
    </div>
    <div class="content">
      <h2>防护</h2>
      <p>恶意：{{xssValue}}</p>
      <p>正常：{{xssValue2}}</p>
    </div>
    <div class="content">
      <h2>插入结果</h2>
      <div v-html="xssValue"></div>
      <div v-html="xssValue2"></div>
      <div v-html="value"></div>
      <div v-html="value2"></div>
    </div>
  </div>
</template>

<script>
const xss = require('xss');

export default {
  name: 'demo39',
  props: [],
  data() {
    return {
      value: '<img src="http://image.oldzhou.cn/FhG6Em1f0O-KbaGpDDgo9q6aSRvz" onload=alert(222) alt="img">',
      value2: '<img src="http://image.oldzhou.cn/FhG6Em1f0O-KbaGpDDgo9q6aSRvz"  alt="img">',
    }
  },
  computed: {
    xssValue() {
      return xss(this.value)
    },
    xssValue2() {
      return xss(this.value2)
    }
  }
}
</script>

<style scoped>
  .content {
    border: 1px solid darkcyan;
    margin: 10px 0;
  }
</style>
