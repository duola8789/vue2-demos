<template>
  <div class="main">
    <p>结果：{{message}}</p>
    <p>结果：{{message2}}</p>
    <button @click="clickHandler(1)">1</button>
    <button @click="clickHandler(2)">2</button>
    <button @click="clickHandler(3)">3</button>
    <button @click="clickHandler2()">4</button>
  </div>
</template>

<script>
import request from '@/utils/request';


export default {
  name: 'demo0',
  data() {
    return {
      message: '',
      message2: '',
    }
  },

  methods: {
    async clickHandler(type) {
      request.visit({url: type}).listen(v => {
        this.message = v;
      })
    },

    async clickHandler2() {
      request.visit({url: 3}).listen(v => {
        this.message2 = v;
      })
    },

  },
}
</script>

<style scoped>
  .main {
    font-size: 16px;
    color: darkcyan;
  }
  button {
    cursor: pointer;
    transition: all 0.1s;
  }
  button:focus {
    background: darkcyan;
  }
</style>
