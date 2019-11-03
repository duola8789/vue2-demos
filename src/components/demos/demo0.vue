<template>
  <div class="main">
    <p>结果：{{message}}</p>
    <button @click="clickHandler(1)">1</button>
    <button @click="clickHandler(2)">2</button>
    <button @click="clickHandler(3)">3</button>
  </div>
</template>

<script>

const request = () => {
  let a = 1;
  return () => {
    return a++;
  }
};


export default {
  name: 'demo0',
  data() {
    return {
      message: '',
      selected: 0,
    }
  },

  methods: {
    async clickHandler(type) {
      this.selected = type;
      const res = await this.fetch(type);
      if (type !== this.selected) {
        return;
      }
      this.message = res;
    },

    fetch(time) {
      return new Promise(resolve => {
        setTimeout(resolve, time * 1000, time)
      })
    }
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
