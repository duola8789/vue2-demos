<template>
  <div>
    <h1><a href="https://zhuanlan.zhihu.com/p/47808652">来自知乎的一个问题</a></h1>
    <p>主要考察的是Promise执行顺序，以及用队列的思想解决问题的思路</p>
    <ul class="ul">
      <li>* 某个应用模块由文本框 input，以及按钮 A，按钮 B 组成。</li>
      <li>* 点击按钮 A，会向地址 urlA 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据），</li>
      <li>* 点击按钮 B，会向地址 urlB 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据）。</li>
      <li>* 当用户依次点击按钮 A、B 的时候，预期的效果是 input 依次被 urlA、urlB 返回的数据填充，</li>
      <li>* 但是由于到 urlA 的请求返回比较慢，导致 urlB 返回的数据被 urlA 返回的数据覆盖了，与用户预期的顺序不一致。</li>
      <li>* 请问如何设计代码，解决这个问题？</li>
    </ul>
    <label><input v-model="value"></label>
    <button @click="sendA">Send A</button>
    <button @click="sendB">Send B</button>
  </div>
</template>

<script>
/**
 * 某个应用模块由文本框 input，以及按钮 A，按钮 B 组成。
 * 点击按钮 A，会向地址 urlA 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据），
 * 点击按钮 B，会向地址 urlB 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据）。
 * 当用户依次点击按钮 A、B 的时候，预期的效果是 input 依次被 urlA、urlB 返回的数据填充，
 * 但是由于到 urlA 的请求返回比较慢，导致 urlB 返回的数据被 urlA 返回的数据覆盖了，与用户预期的顺序不一致。
 * 请问如何设计代码，解决这个问题？
 */

const promiseA = () => (new Promise(((resolve, reject) => {
  setTimeout(() => {
    resolve('valueA')
  }, 3000)
})));

const promiseB = () => (new Promise(((resolve, reject) => {
  setTimeout(() => {
    resolve('valueB')
  }, 1000)
})));

export default {
  name: 'demo22',
  props: [],
  data() {
    return {
      value: '',
      promiseArr: [],
      count: -1,
      start: false
    }
  },
  computed: {},
  methods: {
    async sendA() {
      this.count++;
      this.promiseArr[this.count] = promiseA();
      this.handlePromise();
    },
    async sendB() {
      this.count++;
      this.promiseArr[this.count] = promiseB();
      this.handlePromise();
    },
    async handlePromise() {
      let interval = 0;
      if (this.start) {
        return;
      }
      this.start = true;
      for (let val of this.promiseArr) {
        if (val) {
          interval++;
          const res = await val;
          setTimeout(() => {
            this.value = res
          }, 1000 * interval);
        }
      }
      this.promiseArr = [];
      this.count = -1;
      this.start = false;
    }
  },
  components: {}
}
</script>

<style scoped>
.ul {
  margin-left: 20px;
  width: 1000px;
}
</style>
