<template>
  <div class="main">
    <h1>Demo43 - 粘贴复制</h1>
    <div class="input-container">
      <el-input size="small" v-model="value" class="input"/>
      <el-button @click="paste" type="primary">复制到剪贴板</el-button>
    </div>


  </div>
</template>

<script>
import { copyTextToClipboard } from '@/utils/dom'

export default {
  name: 'demo43',
  data() {
    return {
      value: '',
    }
  },

  activated() {
  },

  methods: {
    paste() {
      if (!this.value) {
        return;
      }
      copyTextToClipboard(this.value)
    },
  },
}
</script>

<style scoped>
  .input-container {
    width: 80%;
    margin: 50px auto;
  }
  .input {
    width: 300px;
    margin-right: 50px;
  }
</style>
